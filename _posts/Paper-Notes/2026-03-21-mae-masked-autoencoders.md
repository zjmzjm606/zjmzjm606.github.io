---
layout: post
title: "Masked Autoencoders Are Scalable Vision Learners (MAE)"
image: papers/mae.jpg
categories: paper-notes
---

## Abstract

MAE 提出了一种视觉自监督预训练方法：随机遮住 75\% 的 image patches，让模型重建被遮住的像素。

架构上采用非对称 encoder-decoder：

大的 ViT encoder 只处理可见的 25\% patches（不使用 mask tokens），

轻量 decoder 利用 latent representations 加 mask tokens 重建完整图片。

该设计实现 3$\times$+ 训练加速的同时提升精度。Vanilla ViT-Huge 在 ImageNet-1K 上达到 87.8\%，

超越所有仅使用 IN1K 数据的方法。迁移学习性能也优于 supervised pre-training。

## Section 1: Introduction

核心问题：为什么 masked prediction 在 NLP 中成功（BERT/GPT），在视觉中却效果不佳？

三个关键差异：

(i)~**架构**：CNN 难以处理 mask tokens
。
(ii)~**信息密度**：图片空间冗余大，遮 15\% 靠插值就能补全（相邻的patch）

(iii)~**Decoder 角色**：NLP 中 decoder 预测的是语义丰富的词，视觉中预测的是低语义的像素，因此 decoder 设计更关键。

MAE 的解法：ViT 架构 + 75\% masking + 非对称 encoder-decoder。

## Section 2: Related Work

四类相关工作：

(1)~**Masked language modeling**（BERT, GPT）：直接灵感来源，证明 ``遮住$\to$预测'' 在 NLP 中可极好扩展

(2)~**Autoencoding**（PCA, DAE）：MAE 是一种以 masking 为破坏方式的 denoising autoencoder。

(3)~**Masked image encoding**（Context Encoder, iGPT, BEiT）：视觉 masking 的前辈；MAE 更简单（直接预测像素，无需 tokenizer）且比 BEiT 更快。

(4)~**Contrastive learning**（SimCLR, MoCo, BYOL）：另一条自监督路线，通过 data augmentation 学不变性；MAE 通过重建学生成式理解，几乎不需要数据增强。

## Section 3: Approach

五个组成部分：

(1)~**Masking**：均匀随机采样，75\% 遮挡率，消除空间冗余。

(2)~**Encoder**：标准 ViT，只处理 25\% 可见 patches（无 mask tokens），计算量因 self-attention 的 $O(n^2)$ 复杂度大幅降低。

(3)~**Decoder**：轻量 Transformer（计算量 $<$10\% encoder），输入为 encoded patches + 可学习 mask tokens + positional embeddings，重建完整图片；预训练后丢弃。

(4)~**Reconstruction target**：预测每个被遮 patch 的像素值，MSE loss 仅在 masked patches 上计算；per-patch normalization 能提升表征质量。

(5)~**Implementation**：shuffle$\to$截断避免 sparse operations，unshuffle 恢复位置后送入 decoder。整个流程简洁、高效、对硬件友好。

## Section 4: ImageNet Experiments

### 4.0 实验设定

We do self-supervised pre-training on the ImageNet-1K training set. Then we do supervised training to evaluate the representations with (i) end-to-end fine-tuning or (ii) linear probing.

两种评估方式：

Fine-tuning（微调）：把预训练好的 encoder 拿来，在 ImageNet 上用标签继续训练，encoder 的所有参数都可以更新。这测的是"预训练的表征经过调整后能多好"。

Linear probing（线性探测）：冻住 encoder 所有参数不动，只在最后加一个线性分类头训练。这测的是"预训练的表征本身有多好"——如果线性分类器就能分得好，说明特征已经很好地线性可分了。

Baseline 结果：ViT-L 从头有监督训练只有 82.5\%，用 MAE 预训练再微调达到 84.9\%。差距 2.4 个点，说明 MAE 预训练确实有用。

### 4.1 Main Properties（消融实验）

#### (a) Masking ratio（遮挡率）
最优比例为 75\%

    - 远高于 BERT 的 15\% 和其他视觉方法的 20--50\%
    - Linear probing 对 masking ratio 极度敏感：从 15\% 到 75\% 准确率提升近 20 个点（54.6\% $\to$ 73.5\%）
    - Fine-tuning 相对不那么敏感：40\%-80\%的范围都行


为什么 decoder 深度对 linear probing重要？

前面 Introduction 说过：“重建像素"是低语义任务。如果 decoder 太浅，encoder 最后几层会被迫去做“像素重建”的脏活，latent representation 的语义层级被拉低。Decoder 深一些，就能把这些低语义工作揽过去，encoder 的表征保持在高语义层面。

#### Decoder 深度和宽度

**深度**：Decoder 深度对 linear probing 至关重要。
1 个 Transformer block 的 decoder 可 fine-tune 到 84.8\%，但 linear probe 仅 65.5\%；
8 个 blocks 时 linear probe 达到 73.5\%（提升 8 个点）。
原因：浅 decoder 迫使 encoder 最后几层专注于像素重建（低语义任务），
深 decoder 可承担重建工作，使 encoder 的 latent representation 保持在更抽象的语义层面。
Fine-tuning 时可调整 encoder 后几层适应识别任务，因此对 decoder 深度不敏感。

**宽度**：默认 512-d 在 fine-tuning 和 linear probing 下均表现良好。
更窄的 decoder（128-d）在 fine-tuning 下也可接受。
整体而言，默认 decoder（8 blocks, 512-d）仅占 ViT-L 计算量的 9\%（FLOPs per token）。

#### Mask token 放在哪
对比两种方案：

  - Encoder 包含 mask tokens：fine-tune 84.2\%，linear probe 59.6\%，计算量 3.3$\times$
  - Encoder 不含 mask tokens：fine-tune 84.9\%，linear probe 73.5\%，计算量 1$\times$

不含 mask tokens 的方案全面优于含 mask tokens。

原因：

(1)~消除训练-推理不一致（预训练时 encoder 输入含大量 mask tokens，推理时无）；

(2)~大幅降低计算量（3.3$\times$ $\to$ 1$\times$），实际 wall-clock 加速 2.8--4.1$\times$。

这是 MAE 与 BERT 的关键区别之一 （也是 MAE 最聪明的设计之一）

#### Reconstruction target（重建目标）

  - 像素（不归一化）：fine-tune 84.9\%，linear probe 73.5\%
  - 像素（per-patch 归一化）：fine-tune 85.4\%，linear probe 73.9\%（最优）
  - PCA 系数（96 维）：fine-tune 84.6\%，linear probe 72.3\%
  - dVAE tokens（BEiT 方式）：fine-tune 85.3\%，linear probe 71.6\%


    - 归一化像素最优
    - dVAE tokens（BEiT 的方式）fine-tuning 差不多，但 linear probing 更差，而且实现复杂得多（需要额外训一个 tokenizer，还依赖250M 张图）
    - PCA 降维丢掉了高频信息，效果变差 说明高频信息（纹理、边缘）对学好的表征很重要


#### Data augmentation（数据增强）

    - 只用 random crop 就够了
    - 加 color jittering 反而降低效果
    - 甚至完全不做增强（只 center crop）效果也还行


这跟 contrastive learning 形成鲜明对比。SimCLR 不加 color jittering 掉28个点，BYOL掉13个点。MAE 不需要这些，因为随机 masking 本身就是最强的数据增强—每次mask 的位置不同，等于模型每次看到的都是“不同的图”。

#### Mask sampling strategy（遮挡策略）
对比三种策略：

  - Random sampling（随机）：75\% ratio，fine-tune 84.9\%，linear probe 73.5\%
  - Block-wise masking（大块遮挡）：50\% ratio，fine-tune 83.9\%，linear probe 72.3\%；
        75\% ratio，fine-tune 82.8\%，linear probe 63.9\%（任务过难，训练 loss 高，重建模糊）
  - Grid-wise sampling（网格）：75\% ratio，fine-tune 84.0\%，linear probe 66.0\%（任务过简单，重建清晰但表征质量低）


    - Random 最好
    - Block-wise（速大块）在75\%时崩了，因为任务太难了（一大片连续区域全没了）
    - Grid（规律地每四个留一个）太简单了，模型学到的表征不好


#### Training schedule（训练时长）

训练越久越好，1600 epochs 时还没饱和。对比之下，MoCov3 在300 epochs就饱和了。但因为 MAE 每个 epoch 只看 25\%的 patches，实际 wall-clock 时间 MAE 1600 epochs 比 MoCo v3 300 epochs 还快 （31h vs 36h）。

### Comparisons with Previous Results

    - 跟其他自监督方法比：MAE ViT-H 达到 87.8\%，当时 ImageNet-1K only 的最佳
    - 跟有监督预训练比：有监督在模型变大时会饱和（数据不够），MAE 不会，scaling 趋势跟 JFT-300M 有监督预训练类似


### Partial Fine-tuning

在“冻住全部"（linearprobing）和"全部微调“（fine-tuning）之间尝试了折中：只微调最后几层。

结果：

    - Linear probing: 73.5\%
    - 只微调最后1个 block:81.0\%（暴涨）
    - 微调4个 blocks：接近 full fine-tuning
    - Full fine-tuning (24 blocks) : 84.9\%


跟 MoCo V3 对比：MoCo v3 的 linear probing 更高，但所有 partial fine-tuning 场景都不如 MAE。

核心观点：MAE 学到的特征不是线性可分的，但非线性表征更强。Linear probing 不是评价表征质量的最好方式——对于深度学习来说，非线性特征才是优势所在。

## Section 5 Transfer Learning Experiments

### 目标检测与实例分割 (COCO)
用 ViT + Mask R-CNN 在 COCO 上评估。MAE 全面优于 supervised pre-training：ViT-B 领先 2.4 AP，ViT-L 领先 4.0 AP。模型越大，MAE 优势越明显。也优于 BEiT 和 MoCo v3。

### 语义分割 (ADE20K)
用 UperNet 评估。MAE ViT-L 比 supervised pre-training 高 3.7 mIoU，也优于 BEiT。

### 分类任务 (iNaturalists, Places)

iNaturalists 上大幅超越之前最佳，scaling 趋势好。

Places 上超越使用数十亿张图预训练的方法——MAE 仅用 IN1K 的 128 万张无标注图。

### Pixels vs. Tokens
在所有迁移任务中，normalized pixels 与 dVAE tokens 效果无统计差异（$\Delta < 0.2$）。Tokenization 无额外收益，但增加大量复杂度（额外 pre-training stage、250M 图、大型 CNN encoder 开销）。

## Section 6 Discussion and Conclusion
核心论点：简单且能 scale 的算法是深度学习的核心。MAE 证明视觉自监督预训练可以走与 NLP 相似的轨迹——简单的 autoencoding 方法即可从模型 scaling 中持续获益。图片与文字本质不同（像素非语义单元、patches 非语义分割），但语义理解能从像素级重建任务中涌现。
