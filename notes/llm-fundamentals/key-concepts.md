# LLM Fundamentals — Exam Notes
**Domain weight: ~15% of NCP-AAI exam**

---

## Transformer Architecture

### Attention Mechanism
- **Scaled dot-product attention**: Q·Kᵀ / √d_k → softmax → ×V
- **Multi-head attention**: H heads run attention in parallel, outputs concatenated
- **d_k** = embedding_dim / num_heads (scaling prevents vanishing gradients in softmax)
- Allows every token to attend to every other token — no sequential bottleneck

### Positional Encoding
- Transformers have **no inherent sense of token order** — positional encoding adds it
- Original: sinusoidal (fixed, not learned)
- Modern: **RoPE** (Rotary Position Embedding) — used by Llama-3, Mistral
- RoPE advantage: handles sequences longer than training length better

### Feed-Forward Layers
- After each attention layer: two linear layers with activation (GELU/SwiGLU)
- Width = 4× embedding dim typically
- These store factual knowledge (vs attention routing relationships)

### Key Numbers to Know
| Model | Params | Context | Architecture |
|-------|--------|---------|-------------|
| Llama-3.1-8B | 8B | 128K | GQA, RoPE, SwiGLU |
| Llama-3.1-70B | 70B | 128K | GQA, RoPE, SwiGLU |
| Mistral-7B | 7B | 32K | GQA, Sliding Window Attention |

---

## Tokenization

### BPE (Byte-Pair Encoding)
- Merges most frequent character pairs iteratively
- Used by: GPT-2, GPT-4, Llama (via SentencePiece)
- Whitespace-sensitive: "hello" ≠ " hello"

### WordPiece
- Maximizes likelihood of training data
- Used by: BERT, ELECTRA, DistilBERT
- Unknown tokens become [UNK]

### SentencePiece Unigram LM
- Trains on raw bytes, no pre-tokenization
- Works for **any language** (no whitespace assumptions)
- **Used by Llama-3 and Mistral** — exam-critical fact
- Space prefix `▁` marks word boundaries

### Tokenization Impact on Agents
- Long tool outputs consume many tokens → context overflow risk
- Code tokenizes more efficiently than natural language
- JSON/XML adds overhead (~30% more tokens than raw content)

---

## Fine-Tuning with LoRA

### LoRA Math
- Freeze original weights W (d×d)
- Add low-rank decomposition: ΔW = A·B where A (d×r), B (r×d)
- Trainable params = **2 × d × r** (vs d² for full fine-tuning)
- Rank r: 8 (minimal), 16 (standard), 64 (high capacity)
- **α (alpha)**: scaling factor; effective learning rate ∝ α/r

### Common Mistake
High r ≠ always better. r=16 often matches r=64 with proper α and lr. Start with r=16.

### NeMo Customizer LoRA Config
```python
# NeMo Customizer REST API parameter names:
# adapter_dim = rank r  (not 'lora_rank' or 'rank_r')
# alpha = scaling factor
```

### PEFT Methods Comparison
| Method | Trainable Params | Quality | Speed |
|--------|-----------------|---------|-------|
| Full fine-tune | 100% | Best | Slowest |
| LoRA | ~0.1-1% | Near-full | Fast |
| Prefix tuning | <0.1% | Lower | Fastest |
| QLoRA | ~0.1-1% | Near-LoRA | Fast + low VRAM |

### DPO (Direct Preference Optimization)
- Training data format: **(prompt, chosen, rejected)** triples
- No separate reward model needed (vs PPO/RLHF)
- NeMo Customizer supports DPO for alignment tasks

---

## Exam Quick-Fire Facts

| Question | Answer |
|----------|--------|
| Llama-3 tokenizer type | SentencePiece Unigram LM |
| LoRA rank hyperparameter in NeMo Customizer | adapter_dim |
| What does temperature=0 do? | Greedy decoding — always picks highest-probability token |
| Attention scaling factor | √d_k (square root of key dimension) |
| DPO data format | (prompt, chosen, rejected) triples |
| FP8 GPU requirement | H100 Hopper and Ada Lovelace only |
