---
layout: post
title: "Attention Is All You Need"
categories: paper-notes
---

## Basic Info

- **Authors:** Vaswani et al. (Google Brain / Google Research)
- **Conference:** NeurIPS 2017
- **Link:** [arXiv:1706.03762](https://arxiv.org/abs/1706.03762)

## Key Idea

提出 Transformer 架构，完全基于 attention 机制，抛弃了 RNN 和 CNN。

## Core Architecture

### Scaled Dot-Product Attention

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

其中 $Q$, $K$, $V$ 分别是 query、key、value 矩阵，$d_k$ 是 key 的维度。

### Multi-Head Attention

将 $Q$, $K$, $V$ 线性投影到 $h$ 个不同的子空间，分别做 attention 后拼接：

$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \dots, \text{head}_h)W^O$$

$$\text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)$$

### Positional Encoding

由于 Transformer 没有循环结构，用正弦/余弦函数编码位置信息：

$$PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)$$

$$PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)$$

## Key Results

- WMT 2014 EN-DE: **28.4 BLEU**（当时 SOTA）
- WMT 2014 EN-FR: **41.0 BLEU**
- 训练时间大幅减少（并行化优势）

## Takeaways

1. Self-attention 能有效捕捉长距离依赖
2. 多头注意力让模型关注不同位置的不同表示子空间
3. 架构简洁且高度可并行化，成为后续 BERT、GPT 等模型的基础
