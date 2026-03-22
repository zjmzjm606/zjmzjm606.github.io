---
layout: post
title: "DeepSeekMath"
image: papers/deepseekmath.jpg
categories: paper-notes
---

## Section 1: Introduction

### 要解决的问题
开源模型在数学推理上远远落后于闭源模型（GPT-4, Gemini Ultra）。
本文目标：用 7B 小模型逼近闭源大模型的数学推理水平。

### 两大支柱

**支柱一：大规模数学预训练数据。** 
从 Common Crawl 用迭代式 fastText 分类器挖出 120B 数学 token，
构建 DeepSeekMath Corpus（OpenWebMath 的 9 倍，Minerva 数据的 7 倍）。
基座选择从 DeepSeek-Coder-Base-v1.5 7B 出发，而非通用 LLM，
因为发现 code 预训练有助于数学推理。

**支柱二：GRPO（Group Relative Policy Optimization）。** 
PPO 的变体，去掉 value model（critic），
对每个问题采 $G$ 个输出，组内 reward 做 z-score 归一化直接当 advantage。
省掉一个和 policy 同等大小的模型，显存大幅下降。

### 关键发现

    - **数据 $>$ 参数量**：DeepSeekMath-Base 7B 在 MATH 上追平
          Minerva 540B（参数量差 77 倍）。
    - **Code $\rightarrow$ Math**：code 预训练提升数学推理能力
          （不管是否用工具），部分回答了``code 训练是否提升 reasoning''这个老问题。
    - **arXiv $\approx$ 没用**：在所有数学 benchmark 上都没有显著提升。
    - **RL 的 OOD 泛化**：GRPO 只用英文 GSM8K+MATH 做 RL，
          但中文数学和 tool-use 场景也涨了，说明学到了通用推理能力而非背题。


### 训练流水线总览

    - **继续预训练**（500B tokens，56\% 数学）：
          DeepSeek-Coder-Base 7B $\rightarrow$ DeepSeekMath-Base 7B
    - **SFT**（776K 条：CoT + PoT + Tool-integrated）：
          $\rightarrow$ DeepSeekMath-Instruct 7B
    - **GRPO RL**（144K 英文 CoT 题，仅 GSM8K+MATH）：
          $\rightarrow$ DeepSeekMath-RL 7B


MATH benchmark 逐阶段提升：36.2\% $\rightarrow$ 46.8\% $\rightarrow$ **51.7\%**。

### 统一范式

论文把 RFT、DPO、PPO、GRPO 统一到一个框架下理解：

都在做 $\max \mathbb{E}[advantage \times policy gradient] - KL$。

区别在于：

    - 采样来源：online（当前 policy）vs offline（旧 policy / SFT model）
    - 监督信号：outcome vs process
    - 是否迭代更新 reward model

结论：online $>$ offline；有显式 reward model $>$ DPO 隐式优化。

### 评估维度

    - 中英文数学推理：GSM8K, MATH, CMATH 等 8 个 benchmark
    - 形式化数学：miniF2F（Isabelle 定理证明）
    - 通用能力：MMLU, BBH, HumanEval, MBPP
          ——数学训练不仅没损害，反而提升了通用理解和推理


## Section 2: Math Pre-Training（数学预训练）

### 数据收集：迭代式挖掘流水线

核心思路：用小而精的种子语料训 fastText 分类器，从 Common Crawl 中
召回数学网页，然后通过域名分析和人工标注扩充种子，迭代优化分类器。


    - **种子语料**：OpenWebMath（13.6B tokens，高质量数学网页集合）
    - **训 fastText 分类器**：从种子中随机抽 50 万正样本 + 
          Common Crawl 中 50 万随机网页作负样本。
          配置：向量维度 256，n-gram 最大长度 3，训练 3 个 epoch。
    - **召回与过滤**：对 Common Crawl 做 URL 去重 + 近似去重
          $\rightarrow$ 剩 400 亿网页。用 fastText 打分，按分数排序取 top。
          第 1 轮保留 top 40B tokens。
    - **域名发现（扩充多样性）**：
          
              - 把 Common Crawl 按基础 URL 分组为域名
              - 统计每个域名中被采集的网页比例
              - 比例 $>$ 10\% 的标记为数学相关域名
                    （如 \texttt{mathoverflow.net}）
              - 人工标注这些域名中的数学 URL
                    （如 \texttt{mathoverflow.net/questions}）
              - 把还没采到的网页加入种子语料，重训 fastText
          
    - **迭代收敛**：4 轮迭代后停止
          （第 4 轮 98\% 的数据在第 3 轮就已经采集到了）


最终产出：3550 万数学网页，**120B tokens**
（OpenWebMath 的 $\sim$9 倍，Minerva 数据的 $\sim$7 倍）。

**去污染。** 
对所有评测 benchmark（GSM8K, MATH, CMATH 等）做 10-gram
精确子串匹配，命中的网页直接删除。对短于 10-gram 但 $\geq$ 3-gram
的 benchmark 文本用完全匹配过滤。

### 语料质量验证

用 1.3B 参数的 DeepSeek-LLM，分别在不同数学语料上训 150B tokens，
控制变量对比：


```
\begin{tabular}{lccc}
\hline
语料 & 大小 & GSM8K & CMATH 
\hline
不训数学 & -- & 2.9\% & 12.3\% 
MathPile（85\% arXiv）& 8.9B & 2.7\% & 1.2\% 
OpenWebMath & 13.6B & 11.5\% & 16.8\% 
Proof-Pile-2 & 51.9B & 14.3\% & 19.9\% 
**DeepSeekMath Corpus** & **120.2B** & **23.8\%** & **41.5\%** 
\hline
\end{tabular}
```


**关键发现。** 

    - **arXiv 没用**：MathPile（85\% arXiv）训完后
          CMATH 从 12.3\% 暴跌到 1.2\%，GSM8K 也掉了。
          arXiv 数学论文和``做数学题''是两码事。
    - **质量 $>$ 数量**：DeepSeekMath Corpus 在 50B tokens 时
          就比 Proof-Pile-2 完整训练（51.9B tokens）效果好，
          说明平均质量更高，不只是因为数据多。
    - **多语言关键**：纯英文语料训完后中文数学能力下降甚至归零，
          DeepSeekMath Corpus 包含中文数据，
          CMATH 41.5\% vs 其他最高 19.9\%。


### DeepSeekMath-Base 7B 训练与评估

**训练配置。** 
从 DeepSeek-Coder-Base-v1.5 7B 初始化，训练 500B tokens。
数据配比：56\% DeepSeekMath Corpus + 20\% GitHub Code
+ 10\% arXiv + 4\% AlgebraicStack + 10\% 自然语言（中英文）。
优化器 AdamW，$\beta_1{=}0.9$，$\beta_2{=}0.95$，
lr $= 4.2 \times 10^{-4}$，batch size 10M tokens，context 4K。

**核心结论。** 

    - MATH 36.2\%，超过 Minerva 540B（33.6\%）——
          **7B 干翻 540B，靠的是数据质量**。
    - 数学训练不仅没损害通用能力，反而提升了：
          MMLU $49.1\% \rightarrow 54.9\%$（+5.8\%），
          BBH $55.2\% \rightarrow 59.5\%$（+4.3\%）。
    - 混入 20\% code 数据保住了编程能力
         （HumanEval、MBPP 基本持平）。


**为什么从 Code 模型出发？** 
Code 预训练学到的结构化思维（逻辑链、变量追踪、分步执行）
天然适合数学推理的``分步求解''范式。
这也解释了 program-of-thought prompting 效果好的原因。

## Section 3: Supervised Fine-Tuning（监督微调）

### SFT 数据构成

总量 776K 条指令数据，覆盖英文和中文数学题，
按三种解题格式标注：


    - **Chain-of-Thought (CoT)**：纯文字逐步推理
    - **Program-of-Thought (PoT)**：写 Python 代码求解
    - **Tool-integrated Reasoning**：自然语言推理和代码交替进行，
          先想一步、写代码算、看结果、再想下一步


英文数据来源：GSM8K 和 MATH 题目的 tool-integrated 标注
+ MathInstruct 子集 + Lila-OOD 训练集，覆盖代数、概率、数论、
微积分、几何等。中文数据：K-12 数学题，76 个子话题，
标注 CoT 和 tool-integrated 两种格式。

### 训练配置

训练非常轻量：样本随机拼接到 4K context，
仅训练 **500 步**，batch size 256，恒定学习率 $5 \times 10^{-5}$。
这说明 base model 已经很强，SFT 本质上只是``格式对齐''。

### 结果

**不用工具（CoT 推理）。** 
MATH 达到 **46.8\%**，超过所有开源模型：
比 Qwen 72B（35.2\%）高 11.6\%，
比 WizardMath-v1.1 7B（33.0\%）高 13.8\%。
接近闭源的 GLM-4（47.9\%）和 Baichuan-3（49.2\%），
但仍不及 GPT-4（52.9\%）和 Gemini Ultra（53.2\%）。

**使用工具（Tool-integrated Reasoning）。** 
MATH 达到 **57.4\%**，超过所有开源模型，
包括 InternLM2-Math 20B（54.3\%）和 ToRA 34B（50.8\%），
与 DeepSeek-LLM-Chat 67B（51.1\%）拉开明显差距。

**关键观察。** 
虽然 SFT 数据包含 CoT、PoT、Tool-integrated 三种格式，
后续 RL 阶段**只用了 CoT 格式**的数据，
但 RL 后 tool-use 能力也提升了。
这暗示 RL 学到的是格式无关的通用推理能力。

## Section 4: Reinforcement Learning

### Group Relative Policy Optimization

#### 从 PPO 到 GRPO

PPO 在 LLM 中优化如下 clipped surrogate objective：
\begin{equation}
    \mathcal{J}_{PPO}(\theta) = \mathbb{E}_{q,o} \frac{1}{|o|}\sum_{t=1}^{|o|}
    \min\!\left[\frac{\pi_\theta(o_t|q,o_{<t})}{\pi_{\theta_{old}}(o_t|q,o_{<t})} A_t,\;
    \mathrm{clip}\!\left(\cdot,\, 1{-}\varepsilon,\, 1{+}\varepsilon\right) A_t\right]
\end{equation}

$A_t$ 由 GAE 计算，依赖一个学到的 value function $V_\psi$。
为防止 reward model 被过度优化，PPO 在每个 token 的 reward 里加 KL penalty：
\begin{equation}
    r_t = r_\varphi(q, o_{\leq t}) - \beta \log \frac{\pi_\theta(o_t|q,o_{<t})}{\pi_{ref}(o_t|q,o_{<t})}
\end{equation}

PPO 在 LLM 场景有两个问题：

    - Value function 和 policy 同等大小，显存和计算开销翻倍
    - Reward 只在最后一个 token 给出，value function 需要逐 token 准确估计，
          信号太稀疏，难以训好


GRPO 去掉 value function，对每个问题 $q$ 采 $G$ 个输出，
用组内 reward 的相对分数替代 value function 作为 baseline：
\begin{equation}
    \mathcal{J}_{GRPO}(\theta) = \mathbb{E}\left[
    \frac{1}{G}\sum_{i=1}^{G}\frac{1}{|o_i|}\sum_{t=1}^{|o_i|}\left\{
    \min\!\left[\frac{\pi_\theta(o_{i,t})}{\pi_{\theta_{old}}(o_{i,t})}\hat{A}_{i,t},\;
    \mathrm{clip}(\cdot)\hat{A}_{i,t}\right]
    - \beta\, \mathbb{D}_{KL}[\pi_\theta \| \pi_{ref}]
    \right\}\right]
\end{equation}

三个设计要点：

    - 组内相对 advantage 和 reward model 的训练方式天然一致
          （都是同一问题的不同输出之间做比较）
    - KL 约束从 reward 里解耦出来，直接加在 loss 上
    - KL 用 Schulman (2020) 的无偏估计器：
          $D_{KL} = \frac{\pi_{ref}}{\pi_\theta}
          - \log\frac{\pi_{ref}}{\pi_\theta} - 1$，保证非负


#### Outcome Supervision

每个输出末尾给一个 reward，组内 z-score 归一化后，
整个输出内所有 token 共享同一个 advantage：
\begin{equation}
    \hat{A}_{i,t} = \tilde{r}_i
    = \frac{r_i - \mathrm{mean}(\mathbf{r})}{\mathrm{std}(\mathbf{r})}
\end{equation}

#### Process Supervision

每个推理步骤末尾给一个 reward。
所有输出的所有步骤 reward 一起归一化后，
每个 token 的 advantage = 从该位置开始的所有后续步骤归一化 reward 之和：
\begin{equation}
    \hat{A}_{i,t} = \sum_{index(j) \geq t} \tilde{r}_i^{index(j)}
\end{equation}

比 outcome supervision 更精准地定位推理链中的错误步骤，
但需要额外训练 Process Reward Model。

#### 迭代式 GRPO

随着 policy 变强，旧 reward model 区分度不够。
迭代方案（Algorithm 1）：

    - 用当前 policy 采样新数据
    - 新数据 + 10\% 历史数据（replay）继续训 reward model
    - 把 reference model 更新为当前 policy（重置 KL 锚点）
    - 用新 reward model 继续训 policy


### DeepSeekMath-RL 训练与结果

基于 DeepSeekMath-Instruct 7B 做 RL。
训练数据：**仅** GSM8K + MATH 的英文 CoT 问题（$\sim$144K 题），
故意排除中文和 tool-use 数据以测试 OOD 泛化。
Reward model 从 DeepSeekMath-Base 7B 初始化，lr = $2 \times 10^{-5}$。
GRPO 超参：policy lr = $1 \times 10^{-6}$，$\beta = 0.04$，
$G = 64$，max length 1024，batch size 1024，$\mu = 1$。


```
\begin{tabular}{lccc}
\hline
Benchmark & Instruct & RL (GRPO) & 说明 
\hline
GSM8K & 82.9\% & **88.2\%** & 域内 
MATH & 46.8\% & **51.7\%** & 域内 
MGSM-zh & 73.2\% & **79.6\%** & 域外（无中文数据） 
CMATH & 84.6\% & **88.8\%** & 域外（无中文数据） 
MATH+Tool & 57.4\% & **58.8\%** & 域外（无 tool 数据） 
\hline
\end{tabular}
```


### 统一范式与深入分析

论文把 RFT、DPO、PPO、GRPO 统一到一个框架下：
所有方法本质都在做
$\max \mathbb{E}[advantage \times \nabla\log\pi_\theta] - KL$。


```
\begin{tabular}{lcccc}
\hline
方法 & 采样方式 & Advantage 估计 & 需要 Value Model & 需要 Reward Model 
\hline
RFT & offline & 二值（对/错） & 否 & 否（用 ground truth） 
DPO & offline & 隐式（pair comparison） & 否 & 否（隐式） 
PPO & online & GAE + Value Model & **是** & 是 
GRPO & online & 组内 z-score & **否** & 是 
\hline
\end{tabular}
```


关键实验结论：

    - **Online $>$ Offline**：online 训练（PPO、GRPO）优于
          offline（RFT、DPO），因为训练分布始终和当前 policy 对齐
    - **Outcome supervision 已经很强**：
          process supervision 在此设置下未显著超越 outcome supervision
    - **RL 为什么有效**：不是学到新知识，
          而是增强了 SFT 模型已有的正确推理路径的概率、压低错误路径的概率。
          SFT 模型 top-K 采样已包含正确答案，RL 让 top-1 更准


## Section 5: Discussion

### 统一范式

论文把 RFT、DPO、Online RFT、PPO、GRPO 统一到一个框架下：
所有方法本质都在做
$\max \mathbb{E}[f(advantage) \cdot \nabla\log\pi_\theta] - KL$，
区别在于三个维度。


```
\begin{tabular}{lccccc}
\hline
方法 & 采样 & Advantage & Value Model & Reward Model 
\hline
RFT & offline & 二值（对/错） & 否 & 否 
DPO & offline & 隐式 & 否 & 否（隐式）
Online RFT & online & 二值（对/错） & 否 & 否 
PPO & online & GAE & 是 & 是 
GRPO & online & 组内 z-score & 否 & 是 
\hline
\end{tabular}
```


### 关键实验对比

**Online $>$ Offline。** 
Online 训练（GRPO、PPO）显著优于 offline（RFT、DPO）。
原因是 offline 方法存在 distribution shift：
训练数据来自旧 policy，随着训练进行和当前 policy 分布越来越远。
Online 方法每步从当前 policy 采样，训练分布始终对齐。

**Outcome vs Process Supervision。** 
在此设置下 process supervision 未显著超越 outcome supervision。
论文认为可能原因是 process reward model 质量不够高。
这是一个重要的负面结果——PRM 不是万能的。

**单轮 vs 迭代 RL。** 
迭代更新 reward model 带来小幅提升，
说明一轮 RL 已经捕获了大部分收益。

### RL 为什么有效？（核心分析）

RL 不是让模型学到新知识，
而是**增强了 SFT 模型已有的正确推理路径的概率，
同时压低了错误路径的概率**。

具体来说：

    - SFT 模型的 top-$K$ 采样（$K{=}64$）已经包含正确答案
    - RL 是在做概率重分配（probability redistribution），
          把正确答案从 top-64 推到 top-1
    - 不是在教模型新的解题方法


含义：

    - RL 的上限取决于 SFT 模型的 coverage（能否采到正确答案），
          而非 RL 算法本身
    - 如果 SFT 模型 top-$K$ 里没有正确答案，RL 也无能为力
    - 要突破上限 $\rightarrow$ 更好的预训练数据或更强的 base model


### 未来方向

基于统一范式，论文总结了可能提升 RL 效果的方向：

    - 更好的 reward model（特别是 process reward model）
    - 更大的采样组 $G$ $\rightarrow$ 更准的 advantage 估计
    - 迭代式训练（不断更新 reward model 跟上 policy）
    - 更好的探索策略（让 policy 探索到更多正确路径）


## Section 6: Related Work

### LLM 数学推理

三类工作：

    - **预训练增强**：
          Minerva（PaLM + 数学数据）、Llemma（Code Llama + Proof-Pile-2）。
          DeepSeekMath 思路一致但数据量（120B）远超前人，
          且证明了从 code model 出发的优势。
    - **推理格式**：
          CoT、PoT、Tool-integrated Reasoning。
          DeepSeekMath 的 SFT 同时用了三种格式。
    - **Post-training 方法**：
          RFT（rejection sampling）、WizardMath（evolve-instruct + PPO）、
          Math-Shepherd（PRM + PPO）、MetaMath（数据增强）。
          GRPO 属于此类，但去掉了 value model。


### RLHF

PPO 在 RLHF 中的经典应用（InstructGPT）。
DPO 提出不需要显式 reward model 的替代方案。
GRPO 保留了显式 reward model（和 PPO 一样），
但去掉了 value model（更接近 DPO 的简洁性），
是两种思路的折中。

### Process Supervision

Math-Shepherd 提出用 PRM 做数学推理 RL。
论文在 GRPO 框架下探索了 process supervision，
但发现效果未显著超越 outcome supervision。


## Section 7: Conclusion

### 主要成果


    - DeepSeekMath 7B 在 MATH 上达到 **51.7\%**，
          首次在开源社区突破 50\%，逼近 GPT-4 和 Gemini Ultra
    - 两大支柱：
    
        - 数据工程：迭代式从 Common Crawl 挖出 120B 高质量数学 token，
              用 7B 模型超越了 540B 的 Minerva
        - GRPO：去掉 value model 的 PPO 变体，
              显存大幅下降，效果不输甚至超过 PPO
    


### 关键 Insight


    - **Code 预训练提升数学推理**：
          从 Code 模型出发比通用 LLM 效果好
    - **arXiv 对做数学题没用**：
          数学论文 $\neq$ 数学做题能力
    - **RL 做的是概率重分配**：
          不是教新知识，是把 SFT 模型已有的正确路径推到 top-1
    - **Online $>$ Offline**：
          分布对齐是 RL 有效的关键因素
    - **OOD 泛化**：
          仅用英文 CoT 数据做 RL，中文和 tool-use 也涨了


### 统一范式

论文把 RFT、DPO、PPO、GRPO 统一为
$\max \mathbb{E}[advantage \times \nabla\log\pi] - KL$ 的变体，
区别在于采样方式（online/offline）、advantage 估计、
是否需要 value model 和 reward model。
这个框架为未来的 RL 方法设计提供了清晰的分析工具。
