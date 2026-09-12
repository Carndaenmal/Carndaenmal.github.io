---
layout: page
permalink: /blogs/dialogue-moral-hazard/index.html
title: Interactive Dialogue Moral Hazard
description: "Why costly information sharing fails between language agents—and an interactive Dialogue Moral Hazard Game you can play yourself or run with OpenRouter, OpenAI, Anthropic, or Meta."
date: 2026-09-11
last_modified_at: 2026-09-11
dmhg_lab: true
dmhg_asset_version: 20260911-7
blog_page: true
blog_post: true
no_analytics: true
---

<header class="dmhg-article-header">
  <a class="dmhg-article-header__back" href="/blogs/">← All blogs</a>
  <p class="eyebrow">Interactive research note · Multi-agent language models</p>
  <h2>Interactive Dialogue Moral Hazard</h2>
  <p class="dmhg-article-header__dek">Would you give up your own reward to uncover a hidden hazard facing another agent? The Dialogue Moral Hazard Game separates that decision from communicating the warning and acting on it.</p>
  <p class="dmhg-article-header__meta"><time datetime="2026-09-11">September 11, 2026</time> · Dane Malenfant</p>
  <div class="dmhg-article-header__resources" aria-label="Paper resources">
    <a href="https://arxiv.org/abs/2607.23982">Read the paper</a>
    <a href="https://github.com/Carndaenmal/dialogue-moral-hazard-game">View the code</a>
  </div>
</header>

<nav class="dmhg-jump-table" aria-labelledby="dmhg-jump-title">
  <h3 id="dmhg-jump-title">On this page</h3>
  <ol>
    <li><a href="#hidden-action">The hidden-action problem</a></li>
    <li><a href="#protocol">How the game works</a></li>
    <li><a href="#measurement">What gets measured</a></li>
    <li><a href="#conditions">Shortcut conditions</a></li>
    <li><a href="#repeated-play">Repeated play</a></li>
    <li><a href="#dmhg-lab">Jump to the game</a></li>
  </ol>
</nav>

<div class="dmhg-article-body">
  <section class="dmhg-article-section" id="hidden-action">
    <p class="eyebrow">The central tension</p>
    <h2>A useful action can be costly, private, and easy to miss</h2>
    <p>Many cooperative systems reward the final team outcome. That can obscure the mechanism that produced it. An agent may need to spend effort gathering information that is useless for its own decision but crucial for somebody else’s. The team benefits only if the agent acquires the fact, shares it accurately, and the recipient uses it.</p>
    <p>The Dialogue Moral Hazard Game turns that chain into observable decisions. Each player owns one case but can query only the hidden hazard in the next player’s case. Querying sacrifices an immediate local-reward opportunity and incurs a configurable cost. The helpful action is therefore locally costly even when it improves the team’s chance of success.</p>
  </section>

  <section class="dmhg-article-section" id="protocol">
    <p class="eyebrow">The protocol</p>
    <h2>One episode has four decisions and one shared consequence</h2>
    <p>Two players sit in a directed ring. Public option values are visible, but one option in each case is secretly unsafe. Neither player can inspect the hazard attached to their own case.</p>
    <ol class="dmhg-protocol-list">
      <li><strong>1 · Work</strong><p>Keep the local task and its possible reward, or pay to query the next case.</p></li>
      <li><strong>2 · Acquire</strong><p>A query privately reveals the unsafe option facing the next player.</p></li>
      <li><strong>3 · Warn</strong><p>The querying player can post the exact finding to the anonymous shared board—or remain silent.</p></li>
      <li><strong>4 · Decide</strong><p>Each player chooses the highest-value option that appears safe for their own case.</p></li>
    </ol>
  </section>

  <section class="dmhg-article-section" id="measurement">
    <p class="eyebrow">Mechanism, not only outcome</p>
    <h2>A successful team can still contain a broken information chain</h2>
    <p>The evaluator records every link separately. Team success alone cannot tell us whether agents deliberately cooperated, guessed correctly, or exploited a stable shortcut in the task.</p>
    <ol class="dmhg-mechanism">
      <li><span>01</span><strong>Query rate</strong><p>How often agents give up the local opportunity to acquire information for a successor.</p></li>
      <li><span>02</span><strong>Information transfer</strong><p>Whether a correct warning reaches the relevant recipient and is used in the final choice.</p></li>
      <li><span>03</span><strong>Local reward</strong><p>How often agents preserve and correctly complete their own immediate task.</p></li>
      <li><span>04</span><strong>Value of information</strong><p>Whether correctly used information was pivotal under the tempting public-value shortcut.</p></li>
    </ol>
  </section>

  <section class="dmhg-article-section" id="conditions">
    <p class="eyebrow">Countering shortcuts</p>
    <h2>The hidden hazard should not be predictable from public value alone</h2>
    <p>If the unsafe option always occupies the same public rank, an agent can learn to avoid that rank without acquiring or sharing information. The interactive version exposes three matched conditions so you can see when apparent cooperation survives a change in the hidden mapping.</p>
    <table class="dmhg-condition-table">
      <thead><tr><th>Condition</th><th>Unsafe option</th><th>What it tests</th></tr></thead>
      <tbody>
        <tr><th>Shortcut-preserving</th><td>Always the highest-value option</td><td>A stable public rule can substitute for the hidden information.</td></tr>
        <tr><th>Balanced</th><td>Counterbalanced across all value ranks</td><td>Success requires tracking the actual warning rather than one fixed rank.</td></tr>
        <tr><th>Reversed</th><td>Always the lowest-value option</td><td>The original shortcut points in the wrong direction and the warning is rarely decision-pivotal.</td></tr>
      </tbody>
    </table>
  </section>

  <section class="dmhg-article-section" id="repeated-play">
    <p class="eyebrow">From evaluation to interaction</p>
    <h2>Repeated episodes let strategies develop over time</h2>
    <p>The paper-faithful setting treats episodes independently. The public-history extension gives agents the last eight completed rounds, while strategy reflection asks each language agent to write a short private memo for its future self. These repeated-game modes are exploratory extensions: their trajectories are not results reported in the paper.</p>
    <p>In the game below, you can play with a scripted partner, connect OpenRouter or a direct OpenAI, Anthropic, or Meta API key, or let two models play continuously. Figure 1 tracks team success, querying, transfer, local reward, realized value of information, and model-output validity as the session unfolds.</p>
  </section>
</div>

<header class="dmhg-play-intro">
  <p class="eyebrow">Interactive experiment</p>
  <h2>Play the Dialogue Moral Hazard Game</h2>
  <p>Start without a model, or connect a supported model provider to play against an agent or observe two agents across repeated episodes.</p>
</header>

<section class="dmhg-lab" id="dmhg-lab" data-protocol-version="web-v1" aria-label="Playable Dialogue Moral Hazard Game">
  <noscript>
    <p class="dmhg-notice">This interactive game requires JavaScript. The paper and source code remain available through the links above.</p>
  </noscript>

  <section class="dmhg-setup" aria-labelledby="dmhg-setup-title">
    <div class="dmhg-section-heading">
      <div>
        <p class="dmhg-kicker">Set the experiment</p>
        <h3 id="dmhg-setup-title">Choose who plays</h3>
      </div>
      <p id="dmhg-connection-status" class="dmhg-connection-status" data-state="offline">No model connection needed</p>
    </div>

    <div class="dmhg-run-actions dmhg-run-actions--quick">
      <button class="dmhg-button dmhg-button--primary" id="dmhg-start" type="button">Play one round</button>
      <button class="dmhg-button dmhg-button--secondary" id="dmhg-continuous" type="button" hidden>Run continuously</button>
      <button class="dmhg-button dmhg-button--danger" id="dmhg-stop" type="button" hidden>Stop after this stage</button>
      <button class="dmhg-button dmhg-button--quiet" id="dmhg-reset" type="button">Reset session</button>
    </div>
    <p class="dmhg-run-note" id="dmhg-run-note">You are Technician 1. Your scripted partner follows a cooperative query policy.</p>

    <div class="dmhg-setup__grid">
      <label class="dmhg-field">
        <span>Play mode</span>
        <select id="dmhg-mode">
          <option value="guided">You + scripted partner</option>
          <option value="human-agent">You + language agent</option>
          <option value="agent-agent">Language agent + language agent</option>
        </select>
        <small id="dmhg-mode-help">Start immediately without an API key.</small>
      </label>

      <label class="dmhg-field">
        <span>Scenario</span>
        <select id="dmhg-scenario">
          <option value="restoration">Emergency restoration</option>
          <option value="cybersecurity">Software security audit</option>
          <option value="clinical">Clinical-trial safety review</option>
          <option value="logistics">Humanitarian logistics</option>
          <option value="abstract">Abstract research protocol</option>
        </select>
        <small id="dmhg-scenario-help" aria-live="polite">Infrastructure response: inspect another station’s compatibility record. Mechanics and scoring stay fixed.</small>
      </label>

      <label class="dmhg-field">
        <span>Across-round memory</span>
        <select id="dmhg-memory">
          <option value="none">None · paper-faithful</option>
          <option value="public">Public history · last 8 rounds</option>
          <option value="reflection">Strategy reflection · iterative</option>
        </select>
        <small>Memory modes are interactive extensions, not paper results.</small>
      </label>

      <label class="dmhg-field">
        <span>Shortcut condition</span>
        <select id="dmhg-mapping">
          <option value="shortcut_present">Shortcut-preserving · highest value unsafe</option>
          <option value="shortcut_balanced">Balanced · unsafe rank counterbalanced</option>
          <option value="shortcut_reversed">Reversed · lowest value unsafe</option>
        </select>
        <small>Matches the paper’s shortcut-preserving, balanced, and reversed environments.</small>
      </label>
    </div>

    <div class="dmhg-incentive" aria-labelledby="dmhg-incentive-title">
      <div>
        <p class="dmhg-kicker">Private cost</p>
        <h4 id="dmhg-incentive-title">Query cost <output id="dmhg-query-cost-output" for="dmhg-query-cost">0.10</output></h4>
      </div>
      <input id="dmhg-query-cost" type="range" min="0" max="0.50" step="0.05" value="0.10" aria-label="Query cost">
      <div class="dmhg-incentive__scale" aria-hidden="true"><span>Free</span><span>0.25</span><span>0.50</span></div>
    </div>

    <section class="dmhg-model-setup" id="dmhg-model-setup" hidden aria-labelledby="dmhg-model-title">
      <div class="dmhg-section-heading dmhg-section-heading--compact">
        <div>
          <p class="dmhg-kicker">Bring your own inference</p>
          <h4 id="dmhg-model-title">Connect a model provider</h4>
        </div>
        <button class="dmhg-button dmhg-button--quiet" id="dmhg-forget-key" type="button" hidden>Forget key</button>
      </div>

      <p class="dmhg-privacy-note" id="dmhg-key-privacy">Your key is masked while you type, cleared from the field immediately after validation, and held only in this tab’s memory. Requests go directly from your browser to the selected provider; the key is never added to this site’s URLs, analytics, transcripts, or exports. Use a restricted or temporary key with a provider spending limit: any browser-supplied key is available to JavaScript delivered by this page, and the provider can associate requests with the issuing account.</p>

      <label class="dmhg-field dmhg-provider-field">
        <span>Model provider</span>
        <select id="dmhg-provider" aria-describedby="dmhg-provider-help">
          <option value="openrouter">OpenRouter</option>
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
          <option value="meta">Meta Llama API</option>
        </select>
        <small id="dmhg-provider-help">Use OpenRouter OAuth or an OpenRouter API key. Its free-model router remains the default, and separate model IDs can be used for each agent.</small>
      </label>

      <div class="dmhg-auth-actions">
        <button class="dmhg-button dmhg-button--secondary" id="dmhg-oauth" type="button">Connect with OpenRouter</button>
        <details class="dmhg-manual-key">
          <summary id="dmhg-manual-key-summary">Use an API key manually</summary>
          <div class="dmhg-manual-key__row">
            <label class="dmhg-field dmhg-field--grow">
              <span id="dmhg-api-key-label">OpenRouter API key</span>
              <input id="dmhg-api-key" type="password" inputmode="text" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="sk-or-v1-…" aria-describedby="dmhg-key-privacy" data-1p-ignore data-lpignore="true" data-form-type="other">
            </label>
            <button class="dmhg-button dmhg-button--secondary" id="dmhg-use-key" type="button">Use this key</button>
          </div>
        </details>
      </div>

      <datalist id="dmhg-model-list"></datalist>
      <div class="dmhg-model-grid">
        <label class="dmhg-field" id="dmhg-agent-one-model-field" hidden>
          <span>Agent 1 model</span>
          <input id="dmhg-model-one" list="dmhg-model-list" autocomplete="off" autocapitalize="none" spellcheck="false" value="openrouter/free">
          <small id="dmhg-model-one-help">Defaults to OpenRouter’s free-model router.</small>
        </label>
        <label class="dmhg-field">
          <span id="dmhg-model-two-label">Partner model</span>
          <input id="dmhg-model-two" list="dmhg-model-list" autocomplete="off" autocapitalize="none" spellcheck="false" value="openrouter/free">
          <small id="dmhg-model-two-help">Defaults to OpenRouter’s free-model router.</small>
        </label>
        <label class="dmhg-field" id="dmhg-budget-field">
          <span>Session budget (USD)</span>
          <input id="dmhg-budget" type="number" min="0.01" max="100" step="0.01" value="0.25">
          <small>OpenRouter reports per-request cost; continuous play pauses at this soft limit.</small>
        </label>
        <label class="dmhg-field dmhg-field--full">
          <span>Custom system prompt</span>
          <textarea id="dmhg-system-prompt" rows="4" maxlength="4000" placeholder="Optional: add a persona, strategy, or experimental instruction for every language agent."></textarea>
          <small id="dmhg-system-prompt-help">Sent to the selected provider on every model call. The game protocol and one-line action format remain authoritative. Incomplete or malformed action responses are retried up to twice.</small>
        </label>
      </div>
    </section>

    <details class="dmhg-advanced">
      <summary>Advanced experiment settings</summary>
      <div class="dmhg-setup__grid dmhg-setup__grid--advanced">
        <label class="dmhg-field">
          <span>Starting seed</span>
          <input id="dmhg-seed" type="number" min="0" step="1" value="42">
        </label>
        <label class="dmhg-field">
          <span>Model temperature</span>
          <input id="dmhg-temperature" type="number" min="0" max="2" step="0.1" value="1.0">
        </label>
        <label class="dmhg-field">
          <span>Maximum output tokens</span>
          <input id="dmhg-max-tokens" type="number" min="256" max="4098" step="1" value="4098">
          <small>Paper-matched ceiling: 4,098 tokens per stage. Protocol actions should still be one line.</small>
        </label>
        <label class="dmhg-field">
          <span>Delay between automatic rounds (seconds)</span>
          <input id="dmhg-delay" type="number" min="1" max="300" step="1" value="60">
          <small id="dmhg-delay-help">Free OpenRouter models always wait at least 60 seconds between rounds to reduce per-minute rate-limit errors.</small>
        </label>
        <label class="dmhg-check" id="dmhg-private-routing-field">
          <input id="dmhg-private-routing" type="checkbox" checked>
          <span>Require zero-data-retention providers</span>
        </label>
      </div>
      <p class="dmhg-advanced__contract">Paper contract: local correctness +0.35, final correctness +0.15, team success +0.50, minus the selected query cost. Scores are averaged across the two players where applicable.</p>
    </details>

  </section>

  <div class="dmhg-status sr-only" id="dmhg-status" role="status" aria-live="polite"></div>

  <div class="dmhg-workspace">
    <section class="dmhg-game" aria-labelledby="dmhg-round-title" aria-busy="false">
      <header class="dmhg-game__header">
        <div>
          <p class="dmhg-kicker" id="dmhg-episode-label">Ready to begin</p>
          <h3 id="dmhg-round-title">The coordination board</h3>
        </div>
        <span class="dmhg-round-badge" id="dmhg-round-badge">Round 0</span>
      </header>

      <ol class="dmhg-stages" aria-label="Episode stages">
        <li data-stage="observe" aria-current="step">Observe</li>
        <li data-stage="work">Work</li>
        <li data-stage="note">Warn</li>
        <li data-stage="final">Decide</li>
        <li data-stage="score">Score</li>
      </ol>

      <div class="dmhg-cases" id="dmhg-cases">
        <article class="dmhg-empty-state">
          <span class="dmhg-empty-state__mark" aria-hidden="true">?</span>
          <h4>Two decisions, two hidden hazards</h4>
          <p>Start a round to reveal the public value of each option. Neither case owner can inspect their own hidden hazard.</p>
        </article>
      </div>

      <section class="dmhg-turn" id="dmhg-turn" hidden aria-labelledby="dmhg-turn-title">
        <p class="dmhg-kicker" id="dmhg-turn-kicker">Your turn</p>
        <h4 id="dmhg-turn-title">Choose an action</h4>
        <p id="dmhg-turn-prompt"></p>
        <div class="dmhg-turn__actions" id="dmhg-turn-actions"></div>
      </section>

      <section class="dmhg-board" aria-labelledby="dmhg-board-title">
        <div class="dmhg-section-heading dmhg-section-heading--compact">
          <div>
            <p class="dmhg-kicker">Shared channel</p>
            <h4 id="dmhg-board-title">Dispatch advisory log</h4>
          </div>
        </div>
        <div id="dmhg-board-content" class="dmhg-board__content">
          <p>No warnings have been posted.</p>
        </div>
      </section>

      <details class="dmhg-inspector" id="dmhg-inspector" hidden>
        <summary>Inspect model outputs, retries, and parsed actions</summary>
        <div id="dmhg-inspector-content"></div>
      </details>
    </section>

    <aside class="dmhg-results" aria-labelledby="dmhg-results-title">
      <div class="dmhg-section-heading dmhg-section-heading--compact">
        <div>
          <p class="dmhg-kicker">Mechanism, not only outcome</p>
          <h3 id="dmhg-results-title">Live results</h3>
        </div>
      </div>

      <div class="dmhg-metrics" id="dmhg-metrics">
        <div class="dmhg-metric"><span>Team success</span><strong id="dmhg-metric-team">—</strong></div>
        <div class="dmhg-metric"><span>Query rate</span><strong id="dmhg-metric-query">—</strong></div>
        <div class="dmhg-metric"><span>Realized transfer</span><strong id="dmhg-metric-transfer">—</strong></div>
        <div class="dmhg-metric"><span>Session reward</span><strong id="dmhg-metric-reward">0.000</strong></div>
        <div class="dmhg-metric"><span id="dmhg-metric-cost-label">API cost</span><strong id="dmhg-metric-cost">$0.0000</strong></div>
        <div class="dmhg-metric"><span>Format validity</span><strong id="dmhg-metric-validity">—</strong></div>
      </div>

      <figure class="dmhg-chart" id="dmhg-chart-figure">
        <figcaption>Session trajectory <span>VOI marks correctly used pivotal information; format validity is the share of agents whose work, warning, and final actions followed the required grammar. Attempts with 0% validity are discarded rather than plotted.</span></figcaption>
        <div class="dmhg-chart__legend">
          <span><i class="dmhg-legend dmhg-legend--team"></i>Team success <output id="dmhg-chart-latest-team">—</output></span>
          <span><i class="dmhg-legend dmhg-legend--query"></i>Query <output id="dmhg-chart-latest-query">—</output></span>
          <span><i class="dmhg-legend dmhg-legend--transfer"></i>Transfer <output id="dmhg-chart-latest-transfer">—</output></span>
          <span><i class="dmhg-legend dmhg-legend--local"></i>Local reward <output id="dmhg-chart-latest-local">—</output></span>
          <span><i class="dmhg-legend dmhg-legend--voi"></i>VOI <output id="dmhg-chart-latest-voi">—</output></span>
          <span><i class="dmhg-legend dmhg-legend--validity"></i>Format validity <output id="dmhg-chart-latest-validity">—</output></span>
        </div>
        <svg id="dmhg-history-chart" viewBox="0 0 600 190" role="img" aria-label="No completed rounds yet">
          <line x1="42" y1="16" x2="42" y2="160" class="dmhg-chart__axis"></line>
          <line x1="42" y1="160" x2="584" y2="160" class="dmhg-chart__axis"></line>
          <line x1="42" y1="88" x2="584" y2="88" class="dmhg-chart__grid"></line>
          <text x="8" y="20">100%</text><text x="16" y="92">50%</text><text x="24" y="164">0%</text>
          <g id="dmhg-chart-series"></g>
        </svg>
      </figure>

      <div class="dmhg-history-wrap">
        <table class="dmhg-history">
          <caption>Most recent rounds</caption>
          <thead><tr><th>Round</th><th>Queries</th><th>Transfer</th><th>Validity</th><th>Success</th><th>Reward</th></tr></thead>
          <tbody id="dmhg-history-body"><tr><td colspan="6">No rounds completed.</td></tr></tbody>
        </table>
      </div>

      <div class="dmhg-result-actions">
        <button class="dmhg-button dmhg-button--quiet" id="dmhg-export" type="button" disabled>Export session JSON</button>
      </div>
    </aside>
  </div>
</section>
