---
layout: post
title: "VisGym - Diverse, Customizable, Scalable Environments for Multimodal Agents"
image: papers/visgym.jpg
categories: paper-notes
---

## Abstract
现代 Vision-Language Models (VLMs) 在**多步视觉交互**中的表现还没被充分研究——特别是它们如何在长时间范围内整合**感知、记忆和动作**。

我们提出 VisGym——一个包含 **17 个环境**的 gymnasium，用来评估和训练 VLM。

**环境特点：**

  - 跨越多个领域：符号谜题 (symbolic puzzles)、真实图像理解 (real-image understanding)、导航 (navigation)、操作 (manipulation)
  - 灵活控制：难度 (difficulty)、输入表示 (input representation)、规划时长 (planning horizon)、反馈 (feedback)


提供 multi-step solvers：生成结构化演示数据，支持监督微调 (supervised finetuning)。

**评估结果：**所有前沿模型都在交互环境中表现不佳

  - Easy 配置：**46.6\%** 成功率
  - Hard 配置：**26.0\%** 成功率


**关键发现：**

  - 模型难以有效利用长上下文——无界历史 (unbounded history) 反而比截断窗口 (truncated windows) 表现更差
  - 文本符号任务一旦渲染成视觉就变得更难


然而，显式目标观察 (explicit goal observations)、文本反馈 (textual feedback)、探索性演示 (exploratory demonstrations) 在部分可观察或未知动态环境中能带来一致的提升，揭示了具体的失败模式和改进多步视觉决策的路径。

Code, data, and models can be found at: [https://visgym.github.io/](https://visgym.github.io/)

## Section 1: Introduction

### 人类如何完成复杂任务


人类在视觉丰富的交互环境中完成复杂任务：操作物体、使用设备、探索环境。
成功依赖于**感知、记忆、动作**在多步骤中的紧密耦合。

### VLM 的现状

Foundation Vision-Language Models (VLMs) have made remarkable progress on static vision-language benchmarks and on text-based multi-step tasks such as web browsing and coding. Yet when visual observations must be integrated into multi-step decision-making, their behavior remains far less understood.

Foundation Vision-Language Models (VLMs) 在以下方面取得显著进展：

  - 静态视觉-语言 benchmark 上表现很好
  - 基于文本的多步任务（网页浏览、编程）上也不错


但当**视觉观察必须整合到多步决策**中时，行为还远未被理解。

### 现有评估的问题

近期在机器人操作、电脑使用 agent、游戏 agent 上的评估揭示了视觉交互决策的一系列挑战：
低任务成功率、脆弱的视觉定位、弱泛化能力。

然而，这些研究往往是**领域特定的、观察性的**，缺乏系统的、可控的诊断——
比如上下文长度、表示模态、反馈设计、目标可见性等**领域无关因素**如何影响性能。

### VisGym 的设计目标

VisGym 是一个高度多样化、可扩展、可定制的 gymnasium，包含 17 个长时程环境，旨在：

  - **隔离**限制交互决策的因素
  - **暴露** VLM 在哪里崩溃


**环境特点：**

  - 跨越符号谜题、真实图像理解、导航、操作 (symbolic puzzles, real-image understanding, navigation, manipulation)
  - 每个任务有不同的可观察性（observability）和动态（dynamics）
  - 配备 oracle multi-step solvers 用于监督微调


**关键设计**：提供细粒度控制 (fine-grained controls)

  - 输入表示（input representation）
  - 难度（difficulty）
  - 历史长度（history length）
  - 规划时长（planning horizon）
  - 反馈（feedback）


这些控制使得可以进行**领域无关的、系统性的**分析。

### 主要发现

Across 12 state-of-the-art models, even the strongest achieve only 46.61\% and 26.00\% success in the easy and hard settings, respectively.

在 12 个 SOTA 模型上评估，最强模型在 easy 和 hard 配置下仅达到 46.61\% 和 26.00\% 成功率。

#### 五大失败模式（跨领域）

**(1) 长上下文利用失败 (Long-context leverage failure)**

Models struggle to effectively leverage long-term context, showing a reversed-U relationship where performance degrades as the context grows unbounded.

模型难以有效利用长期上下文，表现出**倒 U 型关系**——随着上下文无限增长，性能反而下降。

**(2) 低级感知定位困难 (Low-level perceptual grounding)**

VLMs struggle with low-level perceptual grounding, a limitation highlighted by symbolic variants of tasks being substantially easier than their visually rendered counterparts.

符号版本的任务比视觉渲染版本**容易得多**，说明 VLM 在低级视觉感知定位上有困难。

**(3) 从视觉转换推断状态困难 (State inference from visual transitions)**

Models struggle to infer task states and outcomes from purely visual transitions, consistently relying on explicit textual feedback to boost performance.

模型难以从纯视觉转换中推断任务状态和结果，**严重依赖显式文本反馈**。

**(4) 显式目标观察的收益不稳定 (Brittle benefit of explicit goals)**

The benefit of providing explicit goal observations is brittle and can backfire: while explicit goals can yield large gains, limited visual perception can cause models to misidentify them and, paradoxically, perform worse than with no goal at all.

提供显式目标观察可能带来大收益，但也可能**适得其反**——
如果视觉感知有限，模型会误识别目标，反而比没有目标时表现更差。

**(5) 标准演示在部分可观察/未知动态下无效 (Failure to learn from standard demonstrations)**

Models fail to learn from standard demonstrations under partial observability or unknown dynamics, requiring information-revealing demonstrations that expose hidden states or clarify dynamics to significantly improve supervised finetuning outcomes.

在部分可观察或未知动态的环境中，模型无法从标准演示中学习，
需要**信息揭示型演示**（暴露隐藏状态或澄清动态）才能显著提升监督微调效果。

### 总结

Together, these findings establish VisGym as a unified and extensible framework for diagnosing, understanding, and ultimately improving VLMs in visually interactive decision-making.

这些发现确立了 VisGym 作为诊断、理解和改进 VLM 视觉交互决策能力的统一且可扩展的框架。

## Section 2: VisGym

VisGym contains 17 visually interactive environments. Each environment exposes initialization parameters that control task configuration and difficulty.

Table 2 提供了环境的高层概览，详细描述见 Appendix B。每个环境指定：

  - **Domain**：观察来自 Real 或 Synthetic 图像
  - **Observability (Obs.)**：Full 或 Partial
  - **Dynamics (Dyn.)**：Known vs. Unknown
  - **Parameters (P.)**：难度参数数量
  - **Available Actions**：可用动作集合


### 基于 Gymnasium 框架的扩展

VisGym 基于 **Gymnasium 框架**构建（MuJoCo 和 Atari 也用这个库）。
因为 vision-language agents 可以理解图像、读指令、生成自由文本，对 Gymnasium 做了以下扩展：

#### Function-Conditioned Action Space（函数条件动作空间）

Instead of the discrete or continuous action vectors used in standard Gymnasium environments, we represent actions as function calls with parameters (e.g., \texttt{('swap', (1, 2))}, \texttt{('rotate', (30.5, 20.4, 15.1))}).

**标准 Gymnasium**：动作是离散或连续的向量。

**VisGym**：动作表示为**函数调用 + 参数**，比如：


  - \texttt{('swap', (1, 2))} — 交换位置 1 和 2
  - \texttt{('rotate', (30.5, 20.4, 15.1))} — 旋转 yaw/pitch/roll 角度


**好处**：让模型利用它们的 function-calling 能力，跨领域组合策略。

#### Function Instructions（函数指令）

每个任务定义一组函数和参数空间。为了支持 **zero-shot rollout**，在模型第一次行动前，会在 prompt 中提供：

  - 函数的自然语言描述
  - 参数约束


#### Environment Feedback（环境反馈）

除了视觉转换（下一帧图像），环境还提供**文本反馈**，描述动作的效果：

  - \texttt{invalid format} — 动作格式错误
  - \texttt{out of bounds} — 超出边界
  - \texttt{executed} — 成功执行


**作用**：帮助视觉感知较弱的模型更好地定位它们的动作。

#### Solver（求解器）

为每个任务实现了**启发式多步求解器**，能用可用动作完成任务。

**求解器特点：**

  - 支持多种求解策略
  - 可选随机性 $\to$ 生成多样化的演示轨迹用于监督微调


### 模块化设计

**模块化结构**：

  - 每个任务定义自己的：动作函数、指令集、求解器
  - 统一的 \texttt{step} 函数处理：解析、验证、执行、反馈


**好处**：容易添加新任务、变化动作空间、生成视觉和文本监督。

## Section 3: Evaluating Frontier Models with VisGym

### Evaluation Setup（评估设置）

We evaluate 12 vision-language models spanning three categories: proprietary, open-weight models, and specialized models targeted at GUI/game environments.

评估了 **12 个 VLM**，分三类：

**1. Proprietary（闭源）：**
Gemini 3 Pro, Gemini 2.5 Pro, GPT-5, Claude Sonnet 4, Grok 4 Fast, Qwen-VL-Max

**2. Open-weight（开源权重）：**
Qwen3-VL-235B-Instruct, GLM-4.5V, Llama-4-Maverick, Qwen-2.5-VL-72B-Instruct, Gemma 3-27B-Instruct

**3. Specialized（专用于 GUI/游戏）：**
UI-Tars-1.5-7B

另外还评估了在 solver demonstrations 上微调的模型。

#### 评估方式：Multi-turn Interaction

All models are evaluated in a multi-turn manner. At each step $t$, the model receives the full history:
$$H_t = \{I, \{(o_\tau, a_\tau, f_\tau)\}_{\tau<t}\}$$

**每一步 $t$，模型接收完整历史：**

  - $I \in \mathbb{R}^{L_I}$：任务指令 (task instruction)
  - $o_\tau \in \mathbb{R}^{H \times W \times C}$：观察 (observation，即屏幕截图)
  - $a_\tau \in \mathbb{R}^{L_a}$：动作 (action)
  - $f_\tau \in \mathbb{R}^{L_f}$：环境反馈 (environment feedback)


The model then outputs an action $a_t$. If it outputs the \texttt{stop} action, the environment terminates and returns a binary reward indicating task success.

模型输出动作 $a_t$。如果输出 \texttt{stop} 动作，环境终止并返回二元奖励（成功/失败）。

#### 步数限制


  - **Easy 设置 + Dot-Pointing + Fetch-Reach**：20 步
  - **Hard 设置 + Fetch Pick-n-Place**：30 步


所有任务都设计为在这些限制内可解。环境会显式提供剩余步数作为反馈的一部分。

#### 评估规模

We evaluate each model on 70 episodes per task and setting (i.e., easy, hard).

每个模型在每个任务的每个设置（easy/hard）上评估 **70 个 episodes**。

### Result and Analysis（结果与分析）

#### 整体表现：前沿 VLM 在 VisGym 上失败

Even the best-performing frontier model, Gemini-3-Pro, achieves only 46.61\% on VisGym (Easy) and 26.00\% on VisGym (Hard), indicating that VisGym poses a significant challenge for existing models.

**最强模型 Gemini-3-Pro：**

  - Easy：**46.61\%**
  - Hard：**26.00\%**


说明 VisGym 对现有模型构成重大挑战。

#### 模型专长分析 (Model Specialization)

作者比较了 3 个最强模型：Gemini 2.5 Pro、GPT-5、Qwen3-VL-235B Instruct。

**GPT-5：长上下文视觉交互能力最强**

GPT-5 shows the best ability to handle long-context visual interactions. This is reflected in its stronger performance on matchstick rotation where the scale is unknown, its higher scores overall on the hard setting, and its visibly longer tail in the number of steps taken to successfully solve tasks.

在 Matchstick Rotation（尺度未知）上表现更好；Hard 设置整体得分更高；成功轨迹的步数分布有更长的尾部。

**Gemini 2.5 Pro：低级视觉感知最强**

Gemini 2.5 Pro is good at low-level visual perception. This is reflected in its strongest performance on Jigsaw, Maze 2D, Zoom-In Puzzle, and Sliding Block, all of which demand tight spatial alignment, accurate correspondence of local patterns, and sensitivity to subtle visual cues.

在 Jigsaw、Maze 2D、Zoom-In Puzzle、Sliding Block 上表现最好——这些任务都需要紧密的空间对齐、准确的局部模式对应、对细微视觉线索的敏感性。

**Qwen-3-VL：物体定位能力强**

Qwen-3-VL is in particular capable of object localization (e.g., strongest in Referring Dot-Pointing).

在 Referring Dot-Pointing 上最强。

#### 步数分布分析

Examining the step count distribution for successful trajectories across models (Fig. 3), we found that most models only peaked around 3-5 steps, followed by a sharp drop in successful trajectories when they spend more steps. This indicates limited capability in effectively handling long-context multi-step visual interactions.

**观察**：大多数模型的成功轨迹在 **3-5 步**达到峰值，之后急剧下降。

**说明**：模型在有效处理长上下文多步视觉交互方面能力有限。

#### 常见失败模式 (Common Failure Patterns)

使用自动化失败发现方法，发现 **4 种跨任务的失败类型**：

**(1) 受限动作空间和动作循环 (Restricted action space and action looping)**

Models often rely on a single repeated operation or fixed-magnitude action.

模型经常依赖单一重复操作或固定幅度的动作：

  - Fetch Pick \& Place：持续朝同一方向移动
  - Jigsaw：只用 \texttt{swap} 而不用 \texttt{reorder}
  - Mental Rotation 3D / Match Rotation：总是旋转相同角度，而不是收敛到最优幅度


**(2) 状态管理失败 (State mismanagement)**

Models fail to maintain or update internal state across steps.

模型无法跨步骤维护或更新内部状态：

  - 忽略文本或环境反馈
  - 重访之前探索过的区域
  - 重复非法动作（尽管之前已经报错）
  - 例子：撞墙后被告知碰撞了，还继续往墙里走


**(3) 提前终止 (Early termination)**

The model terminates before the maximum steps despite not reaching the goal.

模型在未达到目标的情况下，在最大步数之前就终止了。

**(4) 未能使用视觉或空间信息 (Failure to use visual or spatial information)**

Models ignore the visual information provided, such as the target leaving the frame or the item being successfully aligned.

模型忽略提供的视觉信息：目标离开画面、物体已经成功对齐（如 Mental Rotation）。

## Section 4: Diagnosing Frontier Models with VisGym

Section~4 利用 VisGym 的灵活性，对前沿 VLM 进行**控制变量诊断实验**，系统地改变交互设计选择，观察其对模型表现的影响。

**实验模型（4个）：**

  - **闭源**：GPT-5, Gemini 2.5 Pro
  - **开源**：Qwen3-VL-235B Instruct, GLM-4.5V


**四个诊断维度：**

  - 保留多少轮对话历史 (§4.1)
  - 观察模态：图像 vs ASCII 文本 (§4.2)
  - 是否提供文本反馈 (§4.3)
  - 是否在开头提供目标图像 (§4.4)


% ============================================================
### 4.1 Turns to Keep in Conversation History（对话历史保留轮数）

VLMs are known to degrade with long visual context. This creates a dilemma: while long histories provide more information about the environment (e.g., 3D layouts, unknown dynamics), they also introduce redundant observations that may harm performance.

VLM 在长视觉上下文下性能已知会下降。这产生了一个**两难困境**：

  - **保留更多**：历史中包含有用信号（如无效动作反馈、动作幅度与视觉效果的对应关系）
  - **保留更多**：同时引入过时、冗余的视觉观察，可能损害性能


#### 实验设计

在 4 个任务上测试：Maze2D、Sliding Block、MuJoCo Fetch Reach、Matchstick Rotation。

对比 4 种历史窗口大小：

  - $1$：只看当前这一轮（无历史）
  - $2$：当前 + 上一轮
  - $4$：当前 + 前 3 轮
  - $\infty$：保留完整历史，从头到尾全给


#### 核心发现：倒 U 型曲线

Models benefit from including a limited number of previous turns up to roughly four, following a drop when given the full unbounded history. This indicates that expanding visual context helps multi-step visual decision-making only to a point, after which irrelevant or stale observations become detrimental.

**关键结论**：

  - 保留**约 4 轮**历史是最优的
  - 给完整、无限制的历史，性能反而**下降**
  - 说明旧的、过时的视觉观察对模型是**有害噪声**


#### 模型间差异

Task-specific idiosyncrasies are observed:

  - **GPT-5**：在 Matchstick Rotation 上随历史增加持续提升——擅长利用长上下文
  - **Gemini 2.5 Pro**：在 Maze2D 上 scale 得好，但在 Sliding Block 上出现**反向 scaling**（越长越差）
  - **开源模型**：整体都在挣扎


**启示**：交互历史的价值同时取决于任务和模型，不能简单地"全部保留"或"全部丢弃"。

% ============================================================
### 4.2 Representing Observation in Text（用文本表示观察）

Inspired by prior work examining how different task representations affect agent performance, we select four symbolic tasks and implement alternate versions rendered entirely in ASCII.

选择 4 个符号化任务（Matchstick Equation、Maze 2D、Patch Reassembly、Sliding Block），实现两个版本：

  - **Image**：正常的视觉图像渲染
  - **Text**：用 ASCII 字符画表示同样的状态


这样可以绕过视觉编码模块，直接测试模型的**推理能力**是否足够。

#### 核心发现

**GPT-5：瓶颈在视觉感知，不在推理**

GPT-5 substantially improves in most tasks, often achieving 3--$4\times$ higher success rates than in the visual setting, suggesting that its main bottleneck lies in visual grounding rather than long-horizon reasoning.

GPT-5 用 ASCII 后成功率提升 $3$--$4\times$，说明它的主要瓶颈在**视觉 grounding**而不是长期推理。

**Gemini 2.5 Pro：表现混合**

Gemini 2.5 Pro shows mixed behavior: two tasks do not exhibit significant performance change, one task improves, and one task degrades, indicating possible limitations in both perception and planning.

Gemini 2.5 Pro 在不同任务上表现不一（有的提升、有的持平、有的下降），说明它在**感知和规划两方面都有局限**。

**开源模型：两种模态都不行**

Open-weight models struggle across all tasks in both modalities, indicating general weaknesses in long-horizon decision-making regardless of representation.

开源模型在图像和 ASCII 两种模态下都表现不佳，说明**长期决策能力整体较弱**。

**例外：Matchstick Equation 反转**

Interestingly, Matchstick Equation exhibits a reverse trend: all models perform substantially better with the visual representation than with ASCII, likely because the figlet-style ASCII has irregular shapes and spacing that create distorted glyphs which models are known to struggle with.

所有模型在 Matchstick Equation 上反而**图像表现更好**——因为 figlet 风格的 ASCII 字符形状不规则、间距扭曲，模型反而更难处理。

% ============================================================
### 4.3 Removal of Text-based Feedback（去除文本反馈）

Humans can infer action consequences directly from visual changes, but it remains unclear whether VLMs can do the same.

人类可以直接从视觉变化推断动作结果（比如推了一下门，看到门动了就知道推成功了），但 VLM 能做到吗？

#### 实验设计

选择 4 个任务（Maze 3D、Maze 2D、Sliding Block、Matchstick Equation），这些任务的环境反馈 $f$ 不仅包含格式错误提示，还包含约束违反信息（如"撞墙了"、"滑块被挡住了"）。

对比两种设置：

  - **With Feedback**：保留环境文本反馈（如 ``invalid action'', ``hit a wall''）
  - **No Feedback**：去掉文本反馈，模型只能从视觉状态变化来推断


#### 核心发现

All models show consistent drops in average performance. This indicates that models struggle to infer action validity directly from visual transitions.

**所有模型都出现一致的性能下降。**

**结论**：

  - 当前 VLM **无法可靠地从纯视觉变化推断动作是否有效**
  - 模型**严重依赖文本反馈**来进行多步视觉决策
  - 与人类的视觉因果推理能力（Michotte, 1963）相比，差距巨大


% ============================================================
### 4.4 Providing Final Goal at Beginning（在开头提供最终目标）

Providing the solution image upfront simplifies the tasks to visually aligning current observations with a known target, shifting the difficulty from reasoning to visual perception and tool-calling.

在 episode 开始时直接给模型看**目标最终状态的图像** $o_{gt}$。这把任务从"想象目标是什么"简化为"把当前状态对齐到已知目标"，难度从推理转移到视觉感知和动作执行。

#### 实验设计

在 5 个任务上测试：Patch Reassembly、Jigsaw、Colorization、Zoom-In Puzzle、Matchstick Equation。

对比两种设置：

  - **No Final Obs.**：不提供目标图像（正常设置）
  - **With Final Obs.**：在指令中附加真实的目标状态图像 $o_{gt}$


#### 核心发现 1：大多数情况下有帮助

Across tasks, models improve substantially, indicating that a major bottleneck lies in constructing or imagining the target state.

大多数任务上，提供目标图像后模型表现**大幅提升**。

**说明**：模型的一个主要瓶颈在于**构建或想象目标状态**——不知道最终结果该长什么样。

#### 核心发现 2：但性能仍远非完美

However, performance remains far from perfect, indicating additional limitations beyond reasoning, such as fine-grained visual perception and action calling.

即使知道了目标，性能仍然**远不完美**。说明在推理之外，**细粒度视觉感知**和**动作执行**也是重要瓶颈。

#### 核心发现 3：感知错误导致反效果（最惊人的发现）

Surprisingly, GPT-5 and Gemini 2.5 Pro underperform on the Zoom-In Puzzle and Matchstick Equation when the final goal observation is provided, often terminating early despite visible misalignment.

**惊人发现**：GPT-5 和 Gemini 2.5 Pro 在 Zoom-In Puzzle 和 Matchstick Equation 上，有了目标图像后反而**表现更差**！模型经常在明显未对齐的情况下提前终止。

**原因分析**：

A follow-up test confirms this stems from visual misjudgment: Gemini 2.5 Pro incorrectly judged images as identical 80\% and 57\% of the time for these tasks, versus only 18\%, 2\%, and 0\% for Colorization, Jigsaw, and Patch Reassembly.

后续实验验证：让 Gemini 2.5 Pro 判断初始图像和目标图像"是否完全相同"：

  - Zoom-In Puzzle：**80\%** 误判为相同
  - Matchstick Equation：**57\%** 误判为相同
  - Colorization：18\% 误判
  - Jigsaw：2\% 误判
  - Patch Reassembly：0\% 误判


**结论**：当模型的视觉感知能力不足以区分当前状态和目标状态时，提供目标图像反而会让模型**误以为任务已经完成**，从而提前停止。感知错误可以**反转**显式目标提供的预期收益。

## Section 5: Training with VisGym

描述使用 VisGym 进行监督微调的实验，展示结果，并提供关于泛化、模块特异性和数据策划的见解。

% ============================================================
### 5.1 Supervised Fine-Tuning Experiments（监督微调实验）

#### 数据生成

We generate demonstration trajectories for supervised fine-tuning using the multi-step solver described in Section~2.

使用 Section 2 中描述的多步 solver 生成演示轨迹。

**数据预处理过滤：**

  - 丢弃未能完成任务的轨迹
  - 移除初始状态与测试集重叠的轨迹（防止数据泄露）


#### 微调配置

We evaluate two fine-tuning configurations: **single-task** and **mixed-task**.

评估两种微调配置：

  - **Single-task（单任务）**：为每个任务单独微调一个模型
  - **Mixed-task（混合任务）**：在所有任务上联合训练单个模型


**重要细节**：

  - 演示数据**仅来自 easy 难度**
  - Hard 设置的表现用于衡量**难度泛化能力**


#### 训练超参数

All experiments employ Qwen2.5-VL-7B-Instruct with full-parameter fine-tuning.

所有实验使用 **Qwen2.5-VL-7B-Instruct**，全参数微调。

**超参数设置：**

  - Global batch size: 64
  - Learning rate: $1 \times 10^{-5}$
  - Precision: bf16
  - Training steps:
  
    - Single-task: 1,500 steps
    - Mixed-task: 5,000 steps
  
  - Framework: LlamaFactory


#### 结果

As shown in Figures~4 and 3, finetuned models achieve state-of-the-art performance on most tasks, validating both the learnability of our environments and the effectiveness of our multi-step solvers.

如图 4 和图 3 所示，微调后的模型在大多数任务上达到了**最先进的性能**，验证了：

  - 我们的环境是**可学习的**
  - 我们的多步 solver 是**有效的**


These gains confirm that current VLMs can substantially benefit from structured, solver-generated demonstrations in visually grounded multi-step settings.

这些提升证实：当前 VLM 可以从结构化的、solver 生成的演示中**显著受益**，特别是在视觉基础的多步设置中。

% ============================================================
### 5.2 Stronger Base Model Generalizes Better（更强的基础模型泛化更好）

Existing work has discussed the limitations of supervised finetuning and found that it exhibits limited generalization to task variants. This motivates re-examining generalization in the context of modern VLMs.

已有工作讨论了监督微调的局限性，发现它对任务变体的泛化能力有限。这促使我们在现代 VLM 的背景下重新审视泛化能力。

#### 实验设计

选择一组环境，其中 easy-to-hard 难度差距引入了显著的状态变化（如 Zoom-In Puzzle 中更多视图、Patch Reassembly 中更多 patch、更大的迷宫尺寸）。

在**相同的 mixed-task 训练数据**和**相同的优化超参数**下，微调两个模型：

  - Qwen2.5-VL-7B-Instruct（旧版本）
  - Qwen3-VL-8B-Instruct（新版本）


#### 核心发现

Both models achieve comparable performance on the easy variants they were trained on (e.g., 0.59 vs. 0.64), but the more recent Qwen3-VL generalizes substantially better to the harder variants, nearly doubling the success rate on average relative to Qwen2.5-VL.

**在训练过的 easy 变体上**：两个模型表现相当（0.59 vs. 0.64）

**在未见过的 hard 变体上**：Qwen3-VL 泛化能力**显著更强**，平均成功率几乎是 Qwen2.5-VL 的**两倍**。

**结论**：

  - 更新的 VLM 提供了**更强的 OOD 泛化能力**
  - 即使在相同的微调设置下，base model 的质量仍然至关重要
  - 这一趋势突显了 VLM 在多步视觉决策中的进步


% ============================================================
### 5.3 Vision and LLM Both Matter（视觉和 LLM 都重要）

Classic perception–action theories emphasize that fine-grained visual encoding and temporal integration are jointly necessary for interactive behavior. We examine whether this holds for VLMs.

经典的感知-行动理论强调：细粒度的视觉编码和时间整合对于交互行为是**共同必要的**。我们检验这一点是否适用于 VLM。

#### 实验设计

微调三种变体，以隔离每个模块的贡献：

  - **Vision only**：只微调视觉编码器，冻结 LLM
  - **LLM only**：只微调 LLM，冻结视觉编码器
  - **Full (both)**：联合微调视觉编码器和 LLM


计算两个增益指标：

  - **Vision Gain** = Full - LLM only
  - **LLM Gain** = Full - Vision only


#### 核心发现

As shown in Figure~10, most tasks benefit from fine-tuning both components, with the LLM contributing the larger performance gain—particularly in tasks with partial observability or unknown environment dynamics.

如图 10 所示，大多数任务从**微调两个组件**中受益，其中 **LLM 贡献了更大的性能提升**——特别是在**部分可观察性**或**未知环境动力学**的任务中。

**具体观察**：

  - **LLM 主导的任务**（图中 $y > x$ 区域）：
  
    - 部分可观察任务（如 Maze 3D、Mental Rotation 3D）
    - 未知动力学任务（如 Matchstick Rotation、MuJoCo Fetch）
    - 需要跨步骤整合信息的任务
  
  - **Vision 主导的任务**（图中 $y < x$ 区域）：
  
    - Zoom-In Puzzle：需要细粒度的视觉对齐
  


**结论**：

  - **时间推理和历史整合**是当前 VLM 的主要瓶颈
  - 强大的细粒度视觉编码是**必要的**，但通常**不充分**
  - 对于多步决策，LLM 的作用比单纯的视觉感知更关键


% ============================================================
### 5.4 Importance of Information-Revealing Behaviors for SFT Curation（信息揭示行为对 SFT 数据策划的重要性）

Not all experiences contribute equally to decision-making: trajectories that reveal hidden states or disambiguate perceptual aliasing are often far more valuable.

并非所有经验对决策的贡献都相同：**揭示隐藏状态**或**消除感知混淆**的轨迹往往更有价值。

We ask whether inducing such information-revealing behaviors during supervised finetuning helps VLMs form more accurate state representations.

我们探究：在监督微调期间诱导这种信息揭示行为，是否能帮助 VLM 形成更准确的状态表示？

#### 实验 1：Matchstick Rotation（未知动力学）

**任务特点**：动作幅度与视觉效果的对应关系未知（转 10° 和转 30° 在视觉上差多少？）

**两种演示策略**：

  - **Baseline (``3 Moves'')**：执行 3 次随机幅度的移动，直接朝目标前进
  - **Information-revealing (``2 Unit Moves + 1 Move'')**：
  
    - 先执行 2 次**单位尺度**的步骤（暴露动作幅度与感知效果的对应关系）
    - 再执行最终的对齐移动
  


**结果**（图 11）：

  - Baseline: 32.9\% 成功率
  - Information-revealing: **70.0\%** 成功率
  - 提升：**+37.1 个百分点**


#### 实验 2：Mental Rotation 3D Objaverse（部分可观察）

**任务特点**：3D 物体的完整几何形状不可见，需要旋转来探索。

**两种演示策略**：

  - **Baseline (``Solve-Only'')**：沿每个主轴旋转一次，直接到达目标方向
  - **Information-revealing (``Rotate-Then-Solve'')**：
  
    - 沿每个主轴**完整旋转一圈**（暴露完整的 3D 几何形状）
    - 再定位到目标方向
  


**结果**（图 12）：

  - 两个指标（最终角度误差、任务成功率）都显著提升
  - 为验证提升不是因为轨迹更长，作者进行了**反向实验**：
  
    - 先在 Rotate-Then-Solve 上训练
    - 再继续在 Solve-Only 上训练
    - 结果：性能**下降**
  
  - 证实：提升来自演示的**信息结构**，而非数量或长度


#### 核心结论

These results highlight that SFT effectiveness depends on whether demonstrations induce state-disambiguating behaviors, not merely on the number of examples.

**SFT 的有效性取决于演示是否诱导了状态消歧行为，而不仅仅是样本数量。**

**对数据策划的启示**：

  - 不要只收集"最短路径"演示
  - 需要设计**探索性演示**，暴露：
  
    - 隐藏状态（部分可观察环境）
    - 动作-效果对应关系（未知动力学）
    - 感知混淆的消歧信息
  
  - 这对 agentic post-training 的数据收集有直接指导意义

## Section 6: Related Work

The development of foundation models, particularly vision-language models (VLMs) and vision-language-action models (VLAs), has reshaped how AI agents perceive, make decisions, and act across physical and simulated environments. To properly assess the capabilities and limitations of the models, a plethora of benchmarks have been developed.

基础模型的发展，特别是视觉-语言模型（VLM）和视觉-语言-动作模型（VLA），重塑了 AI agent 在物理和模拟环境中的感知、决策和行动方式。为了正确评估模型的能力和局限性，已经开发了大量 benchmark。

% ============================================================
### Foundation Models: VLMs and VLAs（基础模型：VLM 和 VLA）

#### Vision-Language Models (VLMs)

Recent VLMs have achieved remarkable progress on static vision-language benchmarks, including visual question answering, image captioning, and visual reasoning.

近期的 VLM 在静态视觉-语言 benchmark 上取得了显著进展，包括视觉问答、图像描述和视觉推理。

**代表性工作**：

  - **Flamingo** (Alayrac et al., 2022): 早期的 few-shot VLM
  - **LLaVA** (Liu et al., 2023): 首次使用 GPT-4 生成多模态指令数据
  - **Qwen2.5-VL** (Bai et al., 2025): 当前最强的开源 VLM 之一
  - **Gemini** (Team et al., 2023, 2025): Google 的多模态基础模型
  - **GPT-4V/GPT-5** (OpenAI): 闭源的多模态模型


#### Vision-Language-Action Models (VLAs)

VLAs extend VLMs to embodied settings by directly predicting robot actions from visual and language inputs.

VLA 通过直接从视觉和语言输入预测机器人动作，将 VLM 扩展到具身设置。

**代表性工作**：

  - **RT-2** (Brohan et al., 2023): Google 的机器人 Transformer
  - **OpenVLA** (Kim et al., 2024): 开源的 VLA
  - **$\pi$0** (Black et al., 2024): 通用机器人控制的 flow model
  - **GR00T** (Bjorck et al., 2025): 人形机器人基础模型
  - **Octo** (Octo Model Team et al., 2024): 通用机器人策略


% ============================================================
### Benchmarks for Interactive Decision-Making（交互决策的 Benchmark）

#### 早期 RL Benchmarks

Early benchmarks such as Atari, OpenAI Gym, and DeepMind Lab were developed to evaluate vision-based control and decision-making in fully observable environments.

早期 benchmark 如 Atari、OpenAI Gym 和 DeepMind Lab 被开发用于评估完全可观察环境中的基于视觉的控制和决策。

**代表性工作**：

  - **Atari** (Bellemare et al., 2013): 57 个游戏，像素输入
  - **OpenAI Gym** (Brockman et al., 2016): 标准化的 RL 接口
  - **DeepMind Lab** (Beattie et al., 2016): 3D 导航环境


**局限性**：这些平台主要关注低级运动控制，缺乏语言交互和多任务泛化。

#### 机器人操作和导航 Benchmarks

Subsequent efforts extended these ideas to robotic manipulation and navigation, introducing partially observable, multi-task, and long-horizon settings.

后续工作将这些想法扩展到机器人操作和导航，引入了部分可观察、多任务和长期规划的设置。

**机器人操作**：

  - **RLBench** (James et al., 2020): 100+ 机器人任务
  - **LIBERO** (Liu et al., 2023): 130 个长期操作任务
  - **Meta-World** (Yu et al., 2020): 50 个机器人任务
  - **CausalWorld** (Ahmed et al., 2020): 因果结构和迁移学习


**导航**：

  - **Habitat** (Savva et al., 2019): 真实场景导航
  - **AI2-THOR** (Kolve et al., 2017): 室内场景交互
  - **ManipulaTHOR** (Ehsani et al., 2021): 操作 + 导航


#### 现代 VLM Benchmarks

As visual grounding and reasoning improved, newer benchmarks began representing actions through text instead of fixed action spaces, enabling studies of the interplay between perception, reasoning, and control.

随着视觉 grounding 和推理的改进，新的 benchmark 开始通过文本而不是固定的动作空间来表示动作，从而能够研究感知、推理和控制之间的相互作用。

**静态 VQA Benchmarks**：

  - **MMBench** (Liu et al., 2024): 多模态理解
  - **MMMU** (Yue et al., 2024): 大学水平的多模态理解
  - **MathVista** (Lu et al., 2023): 数学视觉推理


**交互式 Benchmarks**：

  - **OSWorld** (Xie et al., 2024): 369 个真实 OS 任务（Ubuntu, Windows, macOS）
  - **VisualAgentBench** (Liu et al., 2024): 5 个跨域任务
  - **VLABench** (Zhang et al., 2025): 100 个机器人任务
  - **VLM-Gym** (Chen et al., 2025): 4 个游戏环境，支持 RL
  - **VideoGameBench** (Zhang et al., 2025): 23 个游戏任务
  - **WebArena** (Zhou et al., 2023): 网页交互任务


% ============================================================
### VisGym 的独特贡献

VisGym unifies reasoning and control under an RL-style ``gym'' paradigm, combining 17 multimodal tasks spanning visual puzzles, spatial reasoning, manipulation, and grounding.

VisGym 在 RL 风格的 ``gym'' 范式下统一了推理和控制，结合了 17 个多模态任务，涵盖视觉谜题、空间推理、操作和 grounding。

**与现有 benchmark 的对比**（见 Table 1）：

VisGym 是**唯一**同时满足以下条件的 benchmark：

  - 跨多个领域（符号推理、真实图像、导航、操作）
  - 支持结构化和非结构化观察
  - 支持部分可观察（POMDP）
  - 可扩展生成大量 episodes
  - 支持 SFT 和 Online RL


**三大创新**：

  - **统一的 Gymnasium 接口**：所有任务共享相同的 API，易于扩展
  - **可控的诊断维度**：不仅评估性能，还诊断失败原因（Section 4）
  - **训练 + 评估一体化**：每个任务都有 oracle solver，可生成训练数据


Moreover, VisGym introduces controllable difficulty along with targeted diagnostics—such as history utilization, representation variants, feedback specificity, and perception–action causality—allowing researchers to examine not only whether models fail but also what causes failures.

此外，VisGym 引入了可控的难度以及针对性的诊断——如历史利用、表示变体、反馈特异性和感知-动作因果关系——使研究人员不仅能够检查模型是否失败，还能检查失败的原因。

We hope these designs enable more systematic analysis of VLMs and VLAs across domains and levels of interactivity.

我们希望这些设计能够实现对 VLM 和 VLA 在不同领域和交互水平上的更系统的分析。
