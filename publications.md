---
layout: page
permalink: /publications/index.html
title: Publications
---

<nav class="section-nav" aria-label="Publication sections">
  <a href="#conference">Conference</a>
  <a href="#workshop">Workshop</a>
</nav>

<h2 id="conference">Conference</h2>

<section class="publication-feature" aria-labelledby="hidden-gifts-title" data-reveal>
  <img
    src="/images/var_pic.png"
    class="publication-feature__image"
    alt="Learning curves from the hidden-gifts multi-agent reinforcement learning environment"
    width="200"
    height="183"
  >
  <p class="publication-feature__eyebrow">RLC 2026 · Montréal, Canada · August 2026</p>
  <h3 id="hidden-gifts-title">The Challenge of Hidden Gifts in Multi-Agent Reinforcement Learning</h3>
  <p class="publication-feature__authors"><strong>Dane Malenfant</strong> and Blake Aaron Richards</p>

  <dl class="publication-feature__details">
    <dt>Question</dt>
    <dd>How can agents learn reciprocal behaviour when helpful actions produce delayed or difficult-to-observe benefits?</dd>

    <dt>Contribution</dt>
    <dd>We introduce a shared-key grid-world that makes helpful actions unobservable, show that several state-of-the-art multi-agent reinforcement learning algorithms fail to obtain the collective reward, and derive a learning-aware policy-gradient correction that reduces variance and improves reliable convergence to collective success.</dd>

    <dt>My role</dt>
    <dd>Designed the experiments, implemented the environments, and led the analysis.</dd>
  </dl>

  <nav class="publication-feature__links" aria-label="Resources for The Challenge of Hidden Gifts">
    <a href="https://rlj.cs.umass.edu/2026/papers/Paper142.pdf">Paper</a>
    <a href="https://github.com/sfw3r43gegya/Manitokan">Code</a>
    <a href="https://arxiv.org/abs/2505.20579">arXiv</a>
    <a href="https://rlj.cs.umass.edu/2026/papers/Paper142.html">BibTeX</a>
  </nav>
</section>

<section class="publication-feature" aria-labelledby="conspec-title" data-reveal>
  <img
    src="/images/conspec.png"
    class="publication-feature__image"
    alt="Learning curves comparing ConSpec plus PPO with reinforcement-learning baselines"
    width="802"
    height="546"
    loading="lazy"
  >
  <p class="publication-feature__eyebrow">NeurIPS 2023 · New Orleans, USA · December 2023</p>
  <h3 id="conspec-title">Contrastive Retrospection: honing in on critical steps for rapid learning and generalization in RL</h3>
  <p class="publication-feature__authors">Chen Sun, Wannan Yang, Thomas Jiralerspong, <strong>Dane Malenfant</strong>, Benjamin Alsbury-Nealy, Yoshua Bengio, and Blake Aaron Richards</p>

  <dl class="publication-feature__details">
    <dt>Question</dt>
    <dd>How can reinforcement-learning agents identify the few temporally distant decisions that determine eventual success?</dd>

    <dt>Contribution</dt>
    <dd>We introduce Contrastive Retrospection (ConSpec), a plug-in method that uses offline contrastive learning to discover interpretable prototypes of critical states and turn them into intrinsic rewards. ConSpec improves learning across diverse tasks and supports out-of-distribution generalization when sensory features change.</dd>
  </dl>

  <nav class="publication-feature__links" aria-label="Resources for Contrastive Retrospection">
    <a href="https://proceedings.neurips.cc/paper_files/paper/2023/file/6357d6d068622c962391081d296bed69-Paper-Conference.pdf">Paper</a>
    <a href="https://github.com/sunchipsster1/ConSpec">Code</a>
    <a href="https://proceedings.neurips.cc/paper_files/paper/2023/hash/6357d6d068622c962391081d296bed69-Abstract-Conference.html">BibTeX</a>
  </nav>
</section>

---

<h2 id="workshop">Workshop</h2>

<section class="publication-feature" aria-labelledby="moral-hazard-title" data-reveal>
  <img
    src="/images/gepa.png"
    class="publication-feature__image"
    alt="Results comparing cooperation strategies in the Dialogue Moral Hazard Game"
    width="1058"
    height="730"
    loading="lazy"
  >
  <p class="publication-feature__eyebrow">Social Simulation with LLMs @ COLM 2026 · San Francisco, USA · October 2026</p>
  <h3 id="moral-hazard-title">Moral Hazard in Multi-Agent Language Models</h3>
  <p class="publication-feature__authors"><strong>Dane Malenfant</strong></p>

  <dl class="publication-feature__details">
    <dt>Question</dt>
    <dd>How do language agents cooperate when gathering useful information is costly, hidden, and primarily benefits another agent?</dd>

    <dt>Contribution</dt>
    <dd>I introduce the Dialogue Moral Hazard Game and use it to evaluate 17 language models. The results show that similar team-level success can emerge from different cooperation mechanisms, motivating evaluations that measure information gathering and disclosure rather than aggregate success alone.</dd>

    <dt>Authorship</dt>
    <dd>Sole-authored work.</dd>
  </dl>

  <nav class="publication-feature__links" aria-label="Resources for Moral Hazard in Multi-Agent Language Models">
    <a href="https://arxiv.org/pdf/2607.23982">Paper</a>
    <a href="https://arxiv.org/abs/2607.23982">arXiv</a>
    <a href="https://arxiv.org/html/2607.23982">HTML</a>
    <a href="https://arxiv.org/abs/2607.23982">BibTeX</a>
  </nav>
</section>

<section class="publication-feature" aria-labelledby="factored-flow-title" data-reveal>
  <img
    src="/images/ff.png"
    class="publication-feature__image"
    alt="Factored velocity-field architecture for compositional flow matching"
    width="1157"
    height="1240"
    loading="lazy"
  >
  <p class="publication-feature__eyebrow">FoGen @ ICML 2026 · Spotlight · Seoul, South Korea · July 2026</p>
  <h3 id="factored-flow-title">Compositional Flow Matching with Factored Velocity Fields</h3>
  <p class="publication-feature__authors">Avery Hee-Woon Ryoo, <strong>Dane Malenfant</strong>, Matthew G. Perich, and Guillaume Lajoie</p>

  <dl class="publication-feature__details">
    <dt>Question</dt>
    <dd>How can conditional generative models generalize to novel combinations of factors that were absent from training?</dd>

    <dt>Contribution</dt>
    <dd>We propose a factored conditional flow-matching architecture with a shared base velocity and factor-specific heads. It matches or outperforms a monolithic baseline on zero-shot combinations, substantially lowers held-out FID on the hardest Shapes3D splits, and supports adding a new factor without retraining existing components.</dd>
  </dl>

  <nav class="publication-feature__links" aria-label="Resources for Compositional Flow Matching with Factored Velocity Fields">
    <a href="https://openreview.net/pdf?id=77sT6Xaji7">Paper</a>
    <a href="https://openreview.net/forum?id=77sT6Xaji7">OpenReview</a>
    <a href="https://openreview.net/forum?id=77sT6Xaji7">BibTeX</a>
  </nav>
</section>

<section class="publication-feature" aria-labelledby="worlds-edge-title" data-reveal>
  <img
    src="/images/core_trigger_recovers_reward.png"
    class="publication-feature__image"
    alt="Reward recovery associated with a stable core trigger in a changing multi-agent environment"
    width="1754"
    height="1170"
    loading="lazy"
  >
  <p class="publication-feature__eyebrow">World Modeling Workshop 2026 · Montréal, Canada · February 2026</p>
  <h3 id="worlds-edge-title">Reinforcing the World's Edge: A Continual Learning Problem in the Multi-Agent-World Boundary</h3>
  <p class="publication-feature__authors"><strong>Dane Malenfant</strong></p>

  <dl class="publication-feature__details">
    <dt>Question</dt>
    <dd>What reusable decision structure survives across episodes when another learning agent changes the effective world?</dd>

    <dt>Contribution</dt>
    <dd>I define an invariant core of state–action subsequences shared by successful trajectories and show how another agent's policy updates can shrink or eliminate that core. A variation-budget view connects this boundary drift to a continual-learning problem driven by other learners rather than explicit task switches.</dd>

    <dt>Authorship</dt>
    <dd>Sole-authored work.</dd>
  </dl>

  <nav class="publication-feature__links" aria-label="Resources for Reinforcing the World's Edge">
    <a href="https://arxiv.org/pdf/2603.06813">Paper</a>
    <a href="https://arxiv.org/abs/2603.06813">arXiv</a>
    <a href="https://arxiv.org/html/2603.06813">HTML</a>
    <a href="https://arxiv.org/abs/2603.06813">BibTeX</a>
  </nav>
</section>

<section class="publication-feature" aria-labelledby="nato-policy-title" data-reveal>
  <img
    src="/images/policy.png"
    class="publication-feature__image"
    alt="Comparison of public artificial-intelligence strategies across NATO member states"
    width="742"
    height="514"
    loading="lazy"
  >
  <p class="publication-feature__eyebrow">Harms and Risks of AI in the Military 2024 · Montréal, Canada · December 2024</p>
  <h3 id="nato-policy-title">Inconsistencies in Artificial Intelligence Strategy Alignment of NATO Member States</h3>
  <p class="publication-feature__authors">Itai Epstein, <strong>Dane Malenfant</strong>, Sara Parker, and Cella Wardrop</p>

  <dl class="publication-feature__details">
    <dt>Question</dt>
    <dd>How consistently have NATO member states publicly articulated policies for military uses of artificial intelligence?</dd>

    <dt>Contribution</dt>
    <dd>We build a comparative dataset from official national strategies and public statements. Although 88% of NATO members had a national AI strategy, only 34% had published military-specific AI policy, revealing a substantial transparency and alignment gap.</dd>
  </dl>

  <nav class="publication-feature__links" aria-label="Resources for Inconsistencies in Artificial Intelligence Strategy Alignment of NATO Member States">
    <a href="https://openreview.net/pdf?id=apB72N0nxF">Paper</a>
    <a href="https://www.harms-risks-ai-military.org/posters/HRAIM_Inconsistencies_AI_Strategy_Alignment_NATO.pdf">Poster</a>
    <a href="https://openreview.net/forum?id=apB72N0nxF">BibTeX</a>
  </nav>
</section>

<section class="publication-feature" aria-labelledby="causality-fiction-title" data-reveal>
  <img
    src="/images/fiction.png"
    class="publication-feature__image"
    alt="Comparison of causal-language features in fiction and a standard NLP benchmark"
    width="1640"
    height="1448"
    loading="lazy"
  >
  <p class="publication-feature__eyebrow">Text2Story @ ECIR 2022 · Stavanger, Norway · April 2022</p>
  <h3 id="causality-fiction-title">Causality Mining in Fiction</h3>
  <p class="publication-feature__authors">Margaret Meehan, <strong>Dane Malenfant</strong>, and Andrew Piper</p>

  <dl class="publication-feature__details">
    <dt>Question</dt>
    <dd>Do causal-relation models developed on standard NLP benchmarks transfer reliably to literary fiction?</dd>

    <dt>Contribution</dt>
    <dd>We introduce a labeled dataset containing 548 positive causal event pairs from 141 contemporary literary passages, together with matched negative examples. Comparing feature-based and BERT models against SemEval data reveals linguistic and domain differences that complicate causal-relation extraction from fiction.</dd>
  </dl>

  <nav class="publication-feature__links" aria-label="Resources for Causality Mining in Fiction">
    <a href="https://ceur-ws.org/Vol-3117/paper3.pdf">Paper</a>
    <a href="https://txtlab.org/2022/05/why-capturing-causal-reasoning-in-narrative/">Project</a>
    <a href="https://dblp.org/rec/conf/ecir/MalenfantP22">BibTeX</a>
  </nav>
</section>
