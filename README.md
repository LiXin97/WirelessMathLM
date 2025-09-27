# WirelessMathLM: Teaching Mathematical Reasoning for LLMs in Wireless Communications with Reinforcement Learning

[![Website](https://img.shields.io/badge/Website-Live-blue)](https://lixin.ai/WirelessMathLM)
[![arXiv](https://img.shields.io/badge/arXiv-Coming%20Soon-red)](https://arxiv.org/)
[![Code](https://img.shields.io/badge/Code-Coming%20Soon-green)](https://github.com/)

> **Authors:** [Xin Li](https://lixin.ai/), [Mengbing Liu](https://liumengbing.com/), [Yiyang Zhu](https://scholar.google.com/citations?user=LWh42_8AAAAJ), Wenhe Zhang, [Li Wei](https://scholar.google.com.sg/citations?user=zdSz9-gAAAAJ), [Jiancheng An](https://scholar.google.com/citations?user=QbTi47kAAAAJ), [Chau Yuen](https://blogs.ntu.edu.sg/chau-yuen/)
> **Affiliation:** Nanyang Technological University

## 📖 Abstract

Large language models (LLMs) excel at general mathematical reasoning but fail catastrophically on specialized technical mathematics. In wireless communications, where problems require precise manipulation of information-theoretic bounds, optimization constraints, and signal processing formulations, even state-of-the-art models struggle to achieve competent performance.

We present **WirelessMathLM**, demonstrating that compact models (0.5B–7B parameters) can match or exceed much larger models through domain-specific reinforcement learning with verifiable rewards. Our key insight is that wireless mathematics problems possess a unique property—verifiable correctness—that enables effective reinforcement learning without human feedback.

## 🎯 Key Contributions

- **WirelessMathBench-XL**: A comprehensive benchmark of 4,027 problems from 970 papers in wireless communications
- **Domain-specific RL**: Group Relative Policy Optimization (GRPO) with binary verification rewards, training directly from base checkpoints without supervised warm-start
- **Efficient Performance**: Our 7B model achieves 39.5% accuracy, approaching GPT-4o (40.4%) while using ~100× fewer parameters than DeepSeek-R1 (671B, 57.4%)
- **Transfer Learning**: Positive transfer to general mathematics benchmarks (+8.4 points average across MATH, Minerva-Math, OlympiadBench, AMC, and AIME)

## 📊 Results Overview

### Model Performance on WirelessMathBench-XL

| Model | Parameters | Accuracy |
|-------|------------|----------|
| **WirelessMathLM-7B** | 7B | **39.5%** |
| GPT-4o | ~1.8T | 40.4% |
| DeepSeek-R1 | 671B | 57.4% |

### GRPO Training Impact

GRPO training nearly doubles performance across all model scales:
- **0.5B**: +11% improvement
- **3B**: +103% improvement
- **7B**: +81% improvement


## 📋 Dataset: WirelessMathBench-XL

WirelessMathBench-XL contains **4,027 mathematical problems** extracted from **970 research papers** in wireless communications, covering:

- Information theory and channel capacity
- Signal processing and beamforming
- Optimization in wireless networks
- MIMO systems and spatial diversity
- Resource allocation and scheduling
- Network coding and cooperative communications

## 🔬 Methodology

### Group Relative Policy Optimization (GRPO)

Our approach uses GRPO with binary verification rewards:

1. **No Supervised Fine-tuning**: Train directly from base model checkpoints
2. **Verifiable Rewards**: Leverage the mathematical nature of wireless problems for automatic verification
3. **Domain-specific Training**: Focus specifically on wireless communications mathematics
4. **Efficient Scaling**: Achieve strong performance with compact models

### Training Pipeline

```
Base Model → GRPO Training → WirelessMathLM
    ↑              ↑              ↓
Qwen2.5    Binary Rewards   Wireless Math
                              Expertise
```

## 📈 Transfer Learning Results

Our models show positive transfer to general mathematics:

| Benchmark | Improvement |
|-----------|-------------|
| MATH | +8.2 points |
| Minerva-Math | +7.9 points |
| OlympiadBench | +9.1 points |
| AMC | +8.7 points |
| AIME | +8.5 points |
| **Average** | **+8.4 points** |

## 📚 Citation

```bibtex
@article{li2025wirelessmathlm,
  title={WirelessMathLM: Teaching Mathematical Reasoning for LLMs in Wireless Communications with Reinforcement Learning},
  author={Li, Xin and Liu, Mengbing and Zhu, Yiyang and Zhang, Wenhe and Wei, Li and An, Jiancheng and Yuen, Chau},
  journal={arXiv preprint},
  year={2025}
}
```

## 🔗 Resources

- **Paper**: Coming soon on arXiv
- **Code**: Will be released upon publication
- **Website**: [Project Homepage](website/index.html)
- **Overview**: [WirelessMathLM-Overview.pdf](arXiv_WirelessMathLM/WirelessMathLM-Overview.pdf)

## 📧 Contact

For questions or collaborations, please contact:
- **Xin Li**: [xin019@ntu.edu.sg](mailto:xin019@ntu.edu.sg)

---

**Nanyang Technological University** | **Project Maxwell**