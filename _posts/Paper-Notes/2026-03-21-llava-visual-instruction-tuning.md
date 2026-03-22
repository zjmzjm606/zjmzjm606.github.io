---
layout: post
title: "LLaVA - Visual Instruction Tuning"
image: papers/llava.jpg
categories: paper-notes
---

## Section 1: Introduction（引言）

### 背景：两条平行的研究线

#### 视觉基础模型

现有的视觉模型通常是**任务特定**的：

  - 分类：CLIP
  - 检测：Grounded-DINO
  - 分割：SAM
  - 图像生成：DALL-E, Stable Diffusion


**问题**：

  - 每个任务需要独立的模型
  - 任务指令隐含在模型设计中
  - 缺乏统一的交互界面
  - 语言仅用于描述图像内容


#### 大语言模型（LLMs）

ChatGPT 和 GPT-4 展示了语言可以作为**通用接口**：

  - 用自然语言表达任务指令
  - 一个模型处理多种任务
  - 强大的指令跟随能力


**代表性工作**：

  - LLaMA：开源 LLM，性能匹配 GPT-3
  - Alpaca, Vicuna, GPT-4-LLM：使用机器生成的指令数据改进对齐能力


**问题**：仅限于文本，无法处理视觉输入

### 核心问题

**如何将 LLM 的指令跟随能力扩展到多模态（视觉+语言）？**

**挑战**：

  - **缺乏多模态指令数据**：现有的图像-文本对不是指令格式
  - **如何连接视觉和语言**：需要设计架构连接视觉编码器和 LLM
  - **如何评估**：缺乏评估多模态指令跟随能力的 benchmark


### LLaVA 的解决方案

**核心思路**：Visual Instruction Tuning（视觉指令微调）

#### 贡献 1：多模态指令数据生成

使用 **language-only GPT-4** 生成多模态指令数据：

**关键洞察**：虽然 GPT-4 无法看图，但可以基于图像的符号表示生成指令数据

**Pipeline**：

  - 将图像编码为符号表示：
  
    - Captions：描述视觉场景
    - Bounding boxes：定位物体和空间关系
  
  - 用 GPT-4 生成三种类型的指令数据：
  
    - **Conversation**（对话）：多轮问答
    - **Detailed description**（详细描述）：丰富的图像描述
    - **Complex reasoning**（复杂推理）：需要逐步推理的问题
  


**数据规模**：158K 唯一的语言-图像指令跟随样本

  - 58K 对话
  - 23K 详细描述
  - 77K 复杂推理


#### 贡献 2：LLaVA 模型

**架构**：
$$图像 \xrightarrow{CLIP} 视觉特征 \xrightarrow{投影层} 语言嵌入 \xrightarrow{Vicuna} 答案$$

**关键设计**：

  - **视觉编码器**：预训练的 CLIP ViT-L/14
  - **连接层**：简单的线性投影矩阵 $\mathbf{W}$
  - **语言模型**：Vicuna（基于 LLaMA，最强的开源指令跟随 LLM）
  - **训练策略**：端到端微调


**两阶段训练**：

  - **Stage 1**：特征对齐预训练（595K 图像-文本对）
  
    - 冻结视觉编码器和 LLM
    - 仅训练投影层 $\mathbf{W}$
    - 目标：将视觉特征对齐到语言嵌入空间
  
  - **Stage 2**：端到端指令微调（158K 指令数据）
  
    - 冻结视觉编码器
    - 微调投影层和 LLM
    - 目标：学习指令跟随能力
  


#### 贡献 3：LLaVA-Bench

**两个评估 benchmark**：

**1. LLaVA-Bench (COCO)**：

  - 30 张 COCO-Val-2014 图像
  - 每张图像 3 个问题（对话、详细描述、复杂推理）
  - 总计 90 个问题
  - 目标：评估模型在一致视觉输入下的对齐行为和能力


**2. LLaVA-Bench (In-the-Wild)**：

  - 24 张多样化图像（室内、户外、meme、绘画、草图等）
  - 总计 60 个问题
  - 每张图像配有详细的人工标注和精心设计的问题
  - 目标：评估模型在挑战性任务和新领域的泛化能力


**评估方法**：使用 GPT-4 作为评判者

  - 输入：问题、视觉信息（文本描述）、模型回答、参考回答
  - 输出：1-10 分的评分 + 详细解释
  - 评估维度：有用性、相关性、准确性、细节程度
  - 报告相对于 text-only GPT-4 的相对分数


### 主要成果

#### 多模态对话能力


  - 在 GPT-4 论文的例子上表现出类似 GPT-4 的行为
  - 在 LLaVA-Bench (COCO) 上达到 GPT-4 的 **85.1\%** 相对分数
  - 在 LLaVA-Bench (In-the-Wild) 上达到 **67.3\%** 相对分数
  - 显著优于 BLIP-2 (+29\%) 和 OpenFlamingo (+48\%)


#### Science QA 数据集


  - LLaVA 单独：**90.92\%** 准确率
  - LLaVA + GPT-4 (complement)：90.97\% 准确率
  - LLaVA + GPT-4 (judge)：**92.53\%** 准确率（新 SOTA）
  - 首次使用 GPT-4 进行模型集成


### 关键洞察


  - **Language-only GPT-4 可以生成高质量的多模态指令数据**
  
    - 通过符号表示（captions + bounding boxes）编码图像
    - GPT-4 生成的数据质量高于 ChatGPT
  
  
  - **简单的架构设计就足够有效**
  
    - 线性投影层足以连接视觉和语言
    - 不需要复杂的跨模态注意力机制（如 Flamingo 的 gated cross-attention）
  
  
  - **视觉指令微调显著提升多模态能力**
  
    - 相比无指令微调，性能提升超过 50 分
    - 三种类型的指令数据（对话、详细描述、复杂推理）都有贡献
  
  
  - **预训练阶段至关重要**
  
    - 跳过预训练，性能下降 5.11\%
    - 预训练对齐多模态特征，同时保留预训练知识
  


### 开源贡献

LLaVA 团队开源了：

  - 158K 多模态指令数据
  - 模型代码和 checkpoint
  - 可视化对话 demo
  - LLaVA-Bench 评估数据


项目主页：[https://llava-vl.github.io](https://llava-vl.github.io)

## Section 2: Related Work（相关工作）

### 2.1 多模态指令跟随智能体

现有的构建指令跟随智能体的工作可以分为两类：

#### 类别 1：端到端训练的模型

**特点**：为每个特定任务单独训练一个模型

**代表性工作**：

**1. 视觉-语言导航**：

  - VLN：智能体根据自然语言指令在环境中导航
  - Habitat：具身 AI 平台，支持导航任务


**2. 图像编辑**：

  - InstructPix2Pix：根据文本指令编辑图像
  - 例子：输入"把猫变成狗"，模型执行相应的图像编辑


**局限性**：

  - 每个任务需要独立训练
  - 无法泛化到其他任务
  - 缺乏统一的框架


#### 类别 2：系统协调多个模型

**特点**：使用 LLM 作为"大脑"，协调多个专业模型

**架构**：
$$用户指令 \rightarrow LLM（规划器） \rightarrow 调用专业模型 \rightarrow 整合结果$$

**代表性工作**：

  - **Visual ChatGPT**：使用 ChatGPT 协调多个视觉模型
  - **MM-REACT**：多步推理，动态选择视觉工具
  - **VisProg**：LLM 生成程序代码调用视觉模块
  - **ViperGPT**：使用 Python 代码作为中间表示


**优势**：

  - 可以利用现有的专业模型
  - 灵活性高
  - 不需要大量训练


**局限性**：

  - 推理速度慢（需要多次模型调用）
  - 依赖外部模型的质量
  - 系统复杂，难以维护


#### LLaVA 的定位

LLaVA 属于**端到端训练**，但与传统方法的关键区别：


```
\begin{tabular}{lll}
\hline
维度 & 传统端到端模型 & LLaVA 
\hline
任务范围 & 单一任务 & 多任务 
训练方式 & 任务特定 & 指令微调 
泛化能力 & 弱 & 强 
统一接口 & 无 & 有（自然语言） 
\hline
\end{tabular}
```


### 2.2 指令微调（Instruction Tuning）

#### NLP 中的指令微调

**问题**：预训练的 LLM 虽然强大，但不擅长遵循用户指令

**解决方案**：在指令跟随数据上微调

**代表性工作**：

**1. InstructGPT / ChatGPT (OpenAI)**：

  - 在人类标注的指令-回答对上微调 GPT-3
  - 使用 RLHF（人类反馈强化学习）进一步优化
  - 显著提升指令跟随能力和安全性


**2. FLAN-T5 / FLAN-PaLM (Google)**：

  - 在大量任务的指令数据上微调
  - 提升 zero-shot 和 few-shot 泛化能力


**3. Alpaca / Vicuna（开源社区）**：

  - Alpaca：52K GPT-3.5 生成的指令数据，在 LLaMA 上微调
  - Vicuna：70K 用户对话数据，性能接近 ChatGPT


**关键发现**：

  - 指令微调可以显著提升 LLM 的能力
  - 机器生成的指令数据也很有效
  - 相对少量的数据就能带来显著提升


#### 多模态领域的指令微调

**现状**：在 LLaVA 之前，多模态领域的指令微调研究较少

**现有的多模态模型**：


```
\begin{tabular}{lll}
\hline
模型 & 特点 & 局限性 
\hline
Flamingo & Few-shot 学习 & 无显式指令微调 
BLIP-2 & Q-former 连接 & 主要做图像描述 
KOSMOS-1 & 多模态 LLM & 无显式指令微调 
PaLM-E & 具身 AI & 专注于机器人任务 
OpenFlamingo & 开源 Flamingo & 无指令微调 
LLaMA-Adapter & 高效微调 & 指令跟随能力有限 
\hline
\end{tabular}
```


**共同局限性**：

  - 都在图像-文本对上训练，不是指令格式
  - 没有显式的指令微调
  - 指令跟随能力有限


#### LLaVA 的创新

**LLaVA 是第一个在多模态指令数据上微调的工作**


```
\begin{tabular}{lll}
\hline
维度 & 现有多模态模型 & LLaVA 
\hline
训练数据 & 图像-文本对 & 指令跟随数据 
数据格式 & 描述性 & 指令格式 
能力 & 图像理解 & 指令跟随 + 图像理解 
交互方式 & 固定任务 & 灵活的对话 
\hline
\end{tabular}
```


### 2.3 Visual Prompt Tuning vs Visual Instruction Tuning

**重要区分**：这两个概念容易混淆，但完全不同

#### Visual Prompt Tuning

**目标**：提升参数效率（parameter efficiency）

**方法**：

  - 冻结预训练模型的大部分参数
  - 只训练少量的 prompt 参数


**代表工作**：CoOp, VPT

#### Visual Instruction Tuning（LLaVA）

**目标**：提升指令跟随能力（instruction-following ability）

**方法**：

  - 在指令跟随数据上微调模型
  - 学习理解和执行用户指令


**对比表**：


```
\begin{tabular}{lll}
\hline
维度 & Visual Prompt Tuning & Visual Instruction Tuning 
\hline
目标 & 参数效率 & 指令跟随能力 
训练数据 & 任务特定数据 & 指令跟随数据 
训练参数 & 少量 prompt & 模型参数 
应用场景 & 快速适配新任务 & 构建通用助手 
\hline
\end{tabular}
```


### 总结

LLaVA 的核心贡献在于：

  - 首次将指令微调扩展到多模态领域
  - 提出使用 GPT-4 生成多模态指令数据的方法
  - 构建端到端训练的多模态指令跟随模型
  - 为未来的通用视觉助手研究铺平道路


## Section 3: GPT-assisted Visual Instruction Data Generation

### 3.1 问题：缺乏多模态指令数据

**现状**：

  - 有大量的图像-文本对数据（CC, LAION）
  - 但这些数据不是指令格式


**简单的扩展方法（Naive Expansion）**：

$$Human:  \mathbf{X}_q   \mathbf{X}_v  <STOP> Assistant:  \mathbf{X}_c  <STOP>$$

其中 $\mathbf{X}_v$ 是图像，$\mathbf{X}_q$ 是问题（如"描述这张图片"），$\mathbf{X}_c$ 是 caption。

**问题**：

  - 缺乏多样性（问题总是相同）
  - 缺乏深度推理（答案只是简单描述）
  - 缺乏交互性（只有单轮对话）


### 3.2 核心创新：用 GPT-4 生成指令数据

#### 关键洞察

虽然 GPT-4 是 text-only，但可以基于图像的**符号表示**生成指令数据。

#### 符号表示（Symbolic Representation）

用两种符号表示编码图像：

**1. Captions（描述）**：

  - 从不同角度描述视觉场景
  - 例子："一只橙色的猫躺在灰色的沙发上"


**2. Bounding Boxes（边界框）**：

  - 定位场景中的物体
  - 例子：object: "cat", bbox: [100, 150, 300, 400]


#### 完整的 Pipeline


  - **准备输入**：从 COCO 数据集提取 captions 和 bounding boxes
  - **构造 GPT-4 输入**：将符号表示转换为文本格式
  - **生成指令数据**：使用 few-shot prompting 让 GPT-4 生成问题-答案对
  - **过滤和清洗**：人工检查质量，过滤低质量样本


### 3.3 三种类型的指令数据

#### 类型 1：Conversation（对话）

**目标**：多轮对话，涵盖图像的不同方面

**生成方法**：

  - 设计少量人工示例（seed examples）
  - 用 in-context learning 让 GPT-4 生成类似的对话


**特点**：

  - 多轮对话（3-5 轮）
  - 涵盖不同方面：物体类型、数量、动作、位置、关系
  - 只问有明确答案的问题


**数据量**：58K 对话

#### 类型 2：Detailed Description（详细描述）

**目标**：生成丰富、全面的图像描述

**生成方法**：

  - 先让 GPT-4 生成一个"详细描述问题列表"
  - 人工筛选和整理这个列表
  - 对每张图像，随机选一个问题
  - 让 GPT-4 基于这个问题生成详细描述


**特点**：

  - 单轮对话
  - 描述非常详细和全面
  - 包含场景分析和推理


**数据量**：23K 详细描述

#### 类型 3：Complex Reasoning（复杂推理）

**目标**：需要深度推理的问题

**生成方法**：

  - 基于图像内容，生成需要逐步推理的问题
  - 答案需要遵循严格的逻辑


**特点**：

  - 单轮对话
  - 需要多步推理
  - 答案结构化（步骤 1、步骤 2...）
  - 涉及因果关系、逻辑推理、常识判断


**数据量**：77K 复杂推理

### 3.4 数据生成的技术细节

#### In-Context Learning（上下文学习）

**关键技术**：Few-shot prompting

**Prompt 结构**：
\begin{verbatim}
[系统消息]
你是一个帮助生成图像问答数据的助手。

[人工示例 1-3]
图像描述：...
生成的对话：...

[当前任务]
图像描述：[新图像的 captions 和 bounding boxes]
请生成类似的对话：
\end{verbatim}

**人工示例的数量**：

  - 每种类型只需要 3-5 个人工示例
  - 这是整个数据生成过程中**唯一的人工标注**


#### GPT-4 vs ChatGPT


```
\begin{tabular}{lccc}
\hline
模型 & 数据质量 & 空间推理 & 逻辑推理 
\hline
ChatGPT & 中等 & 较弱 & 中等 
GPT-4 & 高 & 强 & 强 
\hline
\end{tabular}
```


**结论**：GPT-4 生成的数据质量明显更高，尤其在空间推理方面

### 3.5 数据统计

**总体规模**：


  - **总计**：158K 唯一的语言-图像指令跟随样本
  - **分类**：
  
    - Conversation（对话）：58K
    - Detailed Description（详细描述）：23K
    - Complex Reasoning（复杂推理）：77K
  
  - **图像来源**：COCO 数据集（约 80K 唯一图像）


**数据分布**：


  - 对话轮数分布：
  
    - 1 轮：100K（详细描述 + 复杂推理）
    - 3-5 轮：58K（对话）
  
  - 平均每张图像：约 2 个指令样本


### 3.6 数据质量

**质量保证措施**：


  - **人工检查**：随机采样检查生成的数据
  - **过滤规则**：
  
    - 只保留有明确答案的问题
    - 过滤掉模糊或主观的问题
    - 确保答案与图像内容一致
  
  - **GPT-4 的优势**：
  
    - 更好的空间推理能力
    - 更准确的逻辑推理
    - 更丰富的语言表达
  


### 关键洞察


  - **Language-only GPT-4 可以生成高质量的多模态指令数据**
  
    - 通过符号表示（captions + bounding boxes）编码图像
    - 不需要 GPT-4 真正"看到"图像
  
  
  - **少量人工示例就足够**
  
    - 每种类型只需 3-5 个人工示例
    - In-context learning 非常有效
  
  
  - **数据多样性很重要**
  
    - 三种类型的数据各有作用
    - 对话、详细描述、复杂推理相互补充
  
  
  - **GPT-4 优于 ChatGPT**
  
    - 尤其在空间推理和逻辑推理方面
    - 值得使用更强的模型生成数据
  


## Section 4: Visual Instruction Tuning（视觉指令微调）

### 4.1 Architecture（模型架构）

#### 设计目标

有效利用两个预训练模型的能力：

  - **预训练的视觉模型**（CLIP）：看图的能力
  - **预训练的 LLM**（Vicuna）：理解和生成语言的能力


#### 三个组件

**1. 视觉编码器：CLIP ViT-L/14**

  - 输入：图像 $\mathbf{X}_v$（224×224 像素）
  - 输出：视觉特征 $\mathbf{Z}_v = g(\mathbf{X}_v)$
  - 使用**最后一层之前**的特征（保留更多局部细节）
  - 在整个训练过程中**冻结**


**2. 投影层：线性变换**

$$\mathbf{H}_v = \mathbf{W} \cdot \mathbf{Z}_v, \quad with \quad \mathbf{Z}_v = g(\mathbf{X}_v)$$


  - 将视觉特征 $\mathbf{Z}_v$ 转换为语言嵌入 $\mathbf{H}_v$
  - 简单的线性投影（一个矩阵乘法）
  - 参数量极少（$\sim$4M vs LLM 的 13B）
  - 支持快速迭代实验


**3. 语言模型：Vicuna**

  - 基于 LLaMA，在对话数据上微调
  - 在开源 LLM 中指令跟随能力最强
  - 模型大小：7B 或 13B
  - 接收视觉 token $\mathbf{H}_v$ 和文本 token 的拼接作为输入


### 4.2 Training（训练）

#### 训练数据格式

多轮对话序列：$(\mathbf{X}_q^1, \mathbf{X}_a^1, \cdots, \mathbf{X}_q^T, \mathbf{X}_a^T)$

指令格式：
\[
\mathbf{X}_{instruct}^t = 
\begin{cases}
随机选择  [\mathbf{X}_q^1, \mathbf{X}_v]  或  [\mathbf{X}_v, \mathbf{X}_q^1], & t = 1 
\mathbf{X}_q^t, & t > 1
\end{cases}
\]

**训练目标**：标准的自回归语言建模 loss

$$p(\mathbf{X}_a | \mathbf{X}_v, \mathbf{X}_{instruct}) = \prod_{i=1}^{L} p_{\boldsymbol{\theta}}(x_i | \mathbf{X}_v, \mathbf{X}_{instruct,<i}, \mathbf{X}_{a,<i})$$

**关键**：只对 Assistant 的回答计算 loss，不对 Human 的问题计算 loss

#### Stage 1：特征对齐预训练

**目标**：让视觉特征和语言嵌入对齐


  - **数据**：CC3M 过滤后的 595K 图像-文本对
  - **格式**：Naive expansion
  
    - Human: <image> 简要描述这张图片
    - Assistant: [原始 caption]
  
  - **冻结**：视觉编码器（CLIP）+ LLM（Vicuna）
  - **训练**：只训练投影层 $\mathbf{W}$
  - **可训练参数**：$\boldsymbol{\theta} = \{\mathbf{W}\}$
  - **超参数**：1 epoch, lr = 2e-3, batch size = 128
  - **本质**：训练一个兼容的视觉 tokenizer


#### Stage 2：端到端指令微调

**目标**：学习指令跟随能力


  - **冻结**：只冻结视觉编码器（CLIP）
  - **训练**：投影层 $\mathbf{W}$ + LLM（Vicuna）
  - **可训练参数**：$\boldsymbol{\theta} = \{\mathbf{W}, \boldsymbol{\phi}\}$
  - **超参数**：3 epochs, lr = 2e-5, batch size = 32


**两种使用场景**：

**1. 多模态聊天机器人**：

  - 数据：158K 指令数据（对话 + 详细描述 + 复杂推理）
  - 均匀采样三种类型


**2. Science QA**：

  - 数据：ScienceQA 21K 多模态选择题
  - 单轮对话格式
  - 问题 + 上下文 → 推理过程 + 答案


#### 两阶段对比


```
\begin{tabular}{lll}
\hline
维度 & Stage 1 & Stage 2 
\hline
目标 & 特征对齐 & 指令跟随 
数据 & 595K 图像-文本对 & 158K 指令数据 
冻结 & CLIP + Vicuna & 只冻结 CLIP 
训练 & 只训练 W & 训练 W + Vicuna 
学习率 & 2e-3 & 2e-5 
Epoch & 1 & 3 
\hline
\end{tabular}
```


### 关键设计洞察


  - **简单的线性投影就足够有效**
  
    - 不需要复杂的 cross-attention 或 Q-Former
    - CLIP 已经和语言部分对齐，简单的线性变换即可
  
  
  - **两阶段训练至关重要**
  
    - 跳过 Stage 1 直接训练，性能下降 5.11\%
    - Stage 1 对齐多模态特征，Stage 2 学习指令跟随
  
  
  - **视觉编码器始终冻结**
  
    - CLIP 的视觉理解能力已经足够强
    - 冻结避免破坏预训练的视觉表示
    - 降低训练成本
  
  
  - **使用倒数第二层的视觉特征**
  
    - 最后一层偏全局、抽象
    - 倒数第二层保留更多局部细节
    - 在 ScienceQA 上提升 0.96\%
  

## Section 5: Experiments（实验）

### 实验设置


  - **硬件**：8× A100 GPUs
  - **Stage 1**：CC-595K, 1 epoch, lr=2e-3, batch=128
  - **Stage 2**：LLaVA-Instruct-158K, 3 epochs, lr=2e-5, batch=32


### 5.1 多模态聊天机器人

#### 定性评估

使用 GPT-4 论文中的例子（如极限熨衣）测试 LLaVA。

**关键发现**：

  - LLaVA 展示出接近 GPT-4 的推理能力
  - BLIP-2 和 OpenFlamingo 只会描述场景，不会回答问题
  - 训练数据仅 $\sim$80K 图像，但泛化能力强
  - **核心差异不是视觉能力，而是指令跟随能力**


#### 定量评估：LLaVA-Bench

**评估方法**：使用 GPT-4 作为评判者

  - 评分维度：有用性、相关性、准确性、细节程度
  - 报告相对于 text-only GPT-4 的相对分数


**LLaVA-Bench (COCO) 消融实验**：


```
\begin{tabular}{lcccc}
\hline
训练数据 & Conv & Detail & Reason & All 
\hline
Full data & 83.1 & 75.3 & 96.5 & **85.1** 
Detail + Complex & 81.5 & 73.3 & 90.8 & 81.9 
Conv + 5\% D + 10\% R & 81.0 & 68.4 & 91.5 & 80.5 
Conversation only & 76.5 & 59.8 & 84.9 & 73.8 
No Instruction Tuning & 22.0 & 24.0 & 18.5 & 21.5 
\hline
\end{tabular}
```


**关键发现**：

  - 指令微调提升超过 **63 个百分点**
  - 三种数据类型都有贡献，全部使用效果最好
  - 推理数据反而提升了对话能力（互相促进）


**LLaVA-Bench (In-the-Wild)**：


```
\begin{tabular}{lcccc}
\hline
模型 & Conv & Detail & Reason & All 
\hline
OpenFlamingo & 19.3 & 19.0 & 19.1 & 19.1 
BLIP-2 & 54.6 & 29.1 & 32.9 & 38.1 
**LLaVA** & **57.3** & **52.5** & **81.7** & **67.3** 
\hline
\end{tabular}
```


**关键发现**：

  - LLaVA 显著优于 BLIP-2 (+29\%) 和 OpenFlamingo (+48\%)
  - 最大优势在复杂推理：LLaVA 81.7\% vs BLIP-2 32.9\%


#### LLaVA 的局限性


  - **"Bag of patches" 问题**：有时把图像当作独立 patch 的集合，无法理解物体间的精确语义关系（如区分"草莓"和"草莓口味的酸奶"）
  - **高分辨率细节识别**：CLIP 输入 224×224，细节被压缩
  - **多语言和外部知识**：无法识别日文标志或特定品牌


### 5.2 ScienceQA

#### 数据集

ScienceQA：21K 多模态多选题，涵盖 3 个学科、26 个主题、127 个类别。

#### 结果


```
\begin{tabular}{lc}
\hline
方法 & 准确率 
\hline
Human & 88.40\% 
GPT-3.5 w/ CoT & 75.17\% 
GPT-4 (text-only) & 82.69\% 
LLaMA-Adapter & 85.19\% 
MM-CoT$_{Large}$ & 91.68\% 
\hline
LLaVA & 90.92\% 
LLaVA + GPT-4 (complement) & 90.97\% 
**LLaVA + GPT-4 (judge)** & **92.53\%** 
\hline
\end{tabular}
```


#### GPT-4 as Judge（模型集成）

**方法**：当 LLaVA 和 GPT-4 给出不同答案时，让 GPT-4 作为裁判选择最终答案。

**为什么有效**：

  - LLaVA 擅长视觉推理
  - GPT-4 擅长文本推理和逻辑判断
  - GPT-4 裁判能识别不需要图像的问题并纠正 LLaVA 的错误
  - 首次使用 GPT-4 进行模型集成


#### 消融实验


```
\begin{tabular}{lcc}
\hline
设计选择 & 准确率 & 差异 
\hline
最佳配置（倒数第二层，先推理）& **90.92\%** & - 
用最后一层特征 & 89.96\% & -0.96\% 
先预测答案再推理 & 89.77\% & -1.15\% 
跳过预训练（Stage 1）& 85.81\% & **-5.11\%** 
用 7B 模型 & 89.84\% & -1.08\% 
\hline
\end{tabular}
```


**关键发现**：

  - **预训练至关重要**：跳过 Stage 1 性能下降 5.11\%
  - **倒数第二层特征更好**：保留更多局部细节（+0.96\%）
  - **CoT 加速收敛**：先推理再回答收敛更快，但最终性能提升有限
  - **模型越大越好**：13B 比 7B 提升 1.08\%

## Section 6: Conclusion（结论）

### 核心贡献

本文证明了 **Visual Instruction Tuning**（视觉指令微调）的有效性。

**三大贡献**：

  - **数据**：提出自动化的指令数据生成 pipeline
  
    - 用 language-only GPT-4 基于图像的符号表示生成多模态指令数据
    - 158K 条数据，几乎零人工标注成本
    - 三种类型：对话、详细描述、复杂推理
  
  
  - **模型**：LLaVA — Large Language and Vision Assistant
  
    - 连接 CLIP（视觉编码器）和 Vicuna（LLM）
    - 简单的线性投影层连接视觉和语言
    - 两阶段训练：特征对齐 → 指令微调
  
  
  - **评估**：LLaVA-Bench
  
    - 首个多模态指令跟随能力的 benchmark
    - 使用 GPT-4 作为评判者
    - 两个版本：COCO 和 In-the-Wild
  


### 主要成果


  - ScienceQA：LLaVA + GPT-4 达到 **92.53\%**（新 SOTA）
  - 多模态对话：达到 GPT-4 的 **85.1\%** 相对分数（LLaVA-Bench COCO）
  - 显著优于 BLIP-2 (+29\%) 和 OpenFlamingo (+48\%)


### 关键洞察


  - **Visual Instruction Tuning 是有效的**
  
    - 指令微调提升超过 63 个百分点
    - 核心差异不是视觉能力，而是指令跟随能力
  
  
  - **Language-only GPT-4 可以生成高质量多模态指令数据**
  
    - 通过符号表示编码图像
    - 3-5 个人工示例即可驱动大规模数据生成
  
  
  - **简单的架构设计就足够有效**
  
    - 简单线性投影即可连接视觉和语言
    - 两阶段训练策略至关重要（跳过 Stage 1 性能下降 5.11\%）
  
  
  - **三种指令数据互相补充**
  
    - 对话：多轮交互能力
    - 详细描述：全面观察能力
    - 复杂推理：深度思考能力
    - 推理数据甚至提升了对话能力
  
  
  - **GPT-4 可以用于模型集成**
  
    - 首次使用 GPT-4 作为裁判进行模型集成
    - LLaVA（视觉推理）+ GPT-4（文本推理）互相补充
  


### 论文的定位

本文是视觉指令微调的**初始步骤**，主要关注现实生活任务。

**局限性**：

  - 输入分辨率低（224×224）
  - 简单的线性投影可能不是最优方案
  - 数据规模相对较小（158K）
  - 存在"bag of patches"等幻觉问题


**开源贡献**：

  - 158K 多模态指令数据
  - 模型代码和 checkpoint
  - 可视化对话 demo
  - LLaVA-Bench 评估数据


### LLaVA 的历史意义

LLaVA 虽然简单，但影响深远：


  - **开创了 Visual Instruction Tuning 这个研究方向**
  - **证明了简单方法的有效性**：线性投影 + 两阶段训练
  - **催生了大量后续工作**：LLaVA-1.5, LLaVA-NeXT, LLaVA-OneVision 等
  - **影响了整个多模态 LLM 领域**：InternVL, Qwen-VL, NVILA 都借鉴了 LLaVA 的架构
  - **建立了 "CLIP + Projector + LLM" 的标准范式**


**对你的研究方向（多模态 agentic post-training）的启示**：

  - LLaVA 证明了**数据比架构更重要**：简单架构 + 好数据 = 好结果
  - **指令微调是让模型"可用"的关键**：预训练给能力，指令微调给方向
  - **两阶段训练**是连接不同预训练模型的有效范式
  - **GPT-4 辅助数据生成**可以大幅降低数据标注成本
