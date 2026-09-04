import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (relativePath) =>
  readFileSync(new URL(relativePath, import.meta.url), 'utf8');

const source = read('./life-simulation.tex');
const bibliography = read('./references.bib');
const structure = read('./LIFESIM-STRUCTURE.md');
const releaseGuide = read('../docs/RELEASE.md');
const readme = read('../README.md');
const normalized = source.replace(/\s+/g, ' ');

const between = (start, end) => {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex + start.length);
  assert.ok(startIndex >= 0, `missing zone start: ${start}`);
  assert.ok(endIndex > startIndex, `missing zone end: ${end}`);
  return source.slice(startIndex, endIndex).replace(/\s+/g, ' ');
};

const abstract = between('\\begin{abstract}', '\\end{abstract}');
const introduction = between(
  '\\section{Introduction}',
  '\\section{Explicit Worlds with Time-Indexed Processes}',
);
const temporal = between(
  '\\section{Explicit Worlds with Time-Indexed Processes}',
  '\\section{The Meaning Model as World Interface}',
);
const meaning = between(
  '\\section{The Meaning Model as World Interface}',
  '\\section{Evaluation Program}',
);
const evaluation = between(
  '\\section{Evaluation Program}',
  '\\section{Adaptive Process Resolution}',
);
const resolution = between(
  '\\section{Adaptive Process Resolution}',
  '\\section{Candidate Process Models}',
);
const functions = between(
  '\\section{Candidate Process Models}',
  '\\section{Narrative as the First Controlled Laboratory}',
);
const narrative = between(
  '\\section{Narrative as the First Controlled Laboratory}',
  '\\section{Learning from Process Endpoints and Histories}',
);
const learning = between(
  '\\section{Learning from Process Endpoints and Histories}',
  '\\section{Measurement: Inner-Life Data from the World}',
);
const measurement = between(
  '\\section{Measurement: Inner-Life Data from the World}',
  '\\section{Understanding People and Alignment}',
);
const alignment = between(
  '\\section{Understanding People and Alignment}',
  '\\section{Applications and Cross-Program Loops}',
);
const applications = between(
  '\\section{Applications and Cross-Program Loops}',
  '\\section{Current Executor Boundary}',
);
const executor = between(
  '\\section{Current Executor Boundary}',
  '\\section{Related Work}',
);
const related = between(
  '\\section{Related Work}',
  '\\section{Limitations}',
);
const limitations = between(
  '\\section{Limitations}',
  '\\section{Conclusion}',
);
const conclusion = between(
  '\\section{Conclusion}',
  '\\appendix',
);
const trainingExport = between(
  '\\section{Proposed Training Export}',
  '\\begingroup',
);

test('the canonical paper is process-first and explicitly prospective', () => {
  assert.match(
    source,
    /^% Canonical Life Simulation pre-experiment method manuscript\./,
  );
  assert.match(
    source,
    /\\ewlongtitle\{Life Simulation\}\{Learning from Worlds and Their Construction\}/,
  );
  assert.match(normalized, /A process path may be continuous, discrete-event, piecewise, stochastic, or hybrid/);
  assert.match(normalized, /The path is required; a compact governing law is an optional hypothesis/);
  assert.match(abstract, /This paper develops the method and specifies experiments for evaluating its learning hypotheses/);
  assert.doesNotMatch(source, /\\textbf\{Evidence status\.\}/);
  assert.match(executor, /https:\/\/github\.com\/emergent-wisdom\/meaning-model/);
  assert.match(executor, /does not yet provide a general hybrid event\/continuous-process runtime/);
  assert.match(executor, /joint predictor/);
});

test('the abstract leads with the linked learning system and its changing objects', () => {
  assert.match(abstract, /Life Simulation proposes learning to maintain continuing worlds/);
  assert.match(abstract, /Constructed worlds become rich linked learning material/);
  assert.match(abstract, /connected corpus model with shared identities and retained disagreements/);
  assert.match(abstract, /World-history supervision.*construction-history supervision.*personality model/);
  assert.match(abstract, /Fractal Intelligence retains and reorganizes reusable capabilities/);
  assert.match(abstract, /Alien-world search revises the categories/);
  assert.match(abstract, /recommended combined training.*continuing Reader.*evaluative orientation/);
  assert.match(abstract, /Durable care remains an objective, not an automatic consequence/);
});

test('the full-system comparison preserves operational coupling beyond component precedent', () => {
  assert.match(introduction, /operational coupling.*accepted world through rendering, inference, interpretation, action, and correction/);
  assert.match(related, /unit of comparison for the full proposal is the coupled system/);
  assert.match(related, /matched system comparisons.*equivalent information and separate training tasks/);
  assert.match(related, /capability formation and exploration control/);
  assert.match(related, /do not establish global originality or a demonstrated learning advantage/);
  assert.match(conclusion, /changes the proposed objects and feedback of learning/);
  assert.match(structure, /full-system comparison/);
});

test('the paper keeps the approved asymmetric reading order', () => {
  const sections = [...source.matchAll(/^\\section\{(.+)\}$/gm)].map(
    (match) => match[1],
  );
  assert.deepEqual(sections, [
    'Introduction',
    'Explicit Worlds with Time-Indexed Processes',
    'The Meaning Model as World Interface',
    'Evaluation Program',
    'Adaptive Process Resolution',
    'Candidate Process Models',
    'Narrative as the First Controlled Laboratory',
    'Learning from Process Endpoints and Histories',
    'Measurement: Inner-Life Data from the World',
    'Understanding People and Alignment',
    'Applications and Cross-Program Loops',
    'Current Executor Boundary',
    'Related Work',
    'Limitations',
    'Conclusion',
    'Proposed Training Export',
  ]);
  assert.match(alignment, /\\label\{sec:combined-training\}/);
  assert.match(alignment, /\\label\{sec:evaluative-frames\}/);
  assert.ok(
    alignment.indexOf('The combined training loop and its tests') <
      alignment.indexOf('Comparison frames for evaluative concepts'),
    'the combined training loop must precede the detailed assessment scheme',
  );
});

test('the introduction preserves the bootstrap and distinct companion contributions', () => {
  assert.match(introduction, /There are two linked ambitions/);
  assert.match(introduction, /Such a world can support play, creative work, or exploration without first becoming a training corpus/);
  assert.match(introduction, /useful interactive continuity does not establish a learning advantage/);
  assert.match(introduction, /a learning result does not by itself establish a useful simulation/);
  assert.match(introduction, /suppose a story says that a promised payment has not arrived/);
  assert.match(introduction, /construction-to-learning chain developed throughout the paper/);
  for (const stage of [
    'Construct forward',
    'Vary the dynamics',
    'Learn the inverse',
    'Project onto licensed material',
    'Compile synchronized targets',
    'Test prospectively',
    'Transfer the discipline',
  ]) {
    assert.match(introduction, new RegExp(stage));
  }
  for (const component of [
    'Meaning Model',
    'Life Simulation',
    'Sema',
    'Imagining the Corpus',
    'Temporal Hindsight Learning',
    'Fractal Intelligence',
    'Understanding Graph',
    'Entangled Alignment',
    'Ontology of the Alien',
    'Substrate Language Modeling',
  ]) {
    assert.match(introduction, new RegExp(component));
  }
  assert.match(introduction, /Narrative is the first controlled laboratory/);
  assert.match(introduction, /Narrative is the first construction laboratory; the reservoir in Section~\\ref\{sec:first-experiment\} is the first proposed controlled learning experiment/);
  assert.match(introduction, /Progressively refined books and game worlds/);
  assert.match(introduction, /model-grounded images or video/);
  assert.match(introduction, /The companion still governs how those proposals are represented, accepted, revised, and rendered/);
  assert.match(introduction, /this is not a handoff from a finished world/);
  assert.match(introduction, /typed world facts and quantities, Cuts and abstract concept models, Event descriptions, story-passage text, and externalized understanding/);
  assert.match(introduction, /This construction contract belongs to Meaning Model/);
  assert.match(introduction, /data-construction contribution/);
  assert.match(introduction, /Coverage, cost, and transfer must be assessed alongside volume/);
  assert.match(introduction, /Meaning Model can provide the evolving world, visible evidence, available options, actions, consequences, and perspective-specific readings/);
  assert.match(introduction, /Fractal Intelligence can provide instrumented Events/);
  assert.match(introduction, /telemetry is causally tied to execution rather than reconstructed afterward/);
  assert.match(introduction, /nine companion contributions/);
  assert.match(introduction, /learn to understand people well enough to treat them well/);
  assert.match(introduction, /rather than assuming that accurate prediction will produce care by itself/);
  assert.match(introduction, /not nine finished modules that every experiment must instantiate/);
});

test('the Life Simulation object admits continuous, event, and hybrid dynamics', () => {
  assert.match(temporal, /accepted explicit world at time \$t\$/);
  assert.match(temporal, /\\label\{eq:life-transition\}/);
  assert.match(temporal, /\\label\{eq:world-interface-update\}/);
  assert.match(temporal, /\\label\{eq:event-projection\}/);
  assert.match(temporal, /\\label\{eq:process-projection\}/);
  assert.match(temporal, /\\label\{eq:life-observation\}/);
  assert.match(temporal, /proposes an entire interval path and its discrete Events, not only an endpoint/);
  assert.match(temporal, /validated update under registry version/);
  assert.match(temporal, /not a second authority that can contradict/);
  assert.match(temporal, /Event path .* is an index or projection of Event records already in that accepted history, not independent state or a second authority/);
  assert.match(temporal, /\\mathcal V\^\{\(k\)\}/);
  assert.doesNotMatch(temporal, /\\mathcal R\^\{\(k\)\}/);
  assert.match(temporal, /\$Q\$ declares which process identifiers, fields, structural perspective roots, and temporal resolution are selected/);
  assert.match(temporal, /receives only the now-defined accepted interval, selected projection, Events/);
  assert.match(temporal, /language-model proposal, deterministic code, a stochastic process, an empirical table, a learned model/);
  assert.match(temporal, /The indispensable object is the versioned path, not the equation/);
  assert.match(temporal, /Continuous coordinates retain units/);
  assert.match(temporal, /Discrete events retain intervals/);
  assert.match(temporal, /Hybrid processes relate the two/);
  assert.match(temporal, /Unknown, unmodeled, and unresolved states remain legal/);
  assert.match(temporal, /not every accepted path is generated by \$G_\{\\phi\}\$/);
  assert.match(temporal, /recorded trajectory may enter the same update through an observation adapter/);
  assert.match(temporal, /world address, temporal support, value domain and unit/);
  for (const uncertainty of [
    'transition stochasticity',
    'uncertainty about latent state',
    'parameter uncertainty',
    'measurement error',
    'population heterogeneity',
    'model discrepancy',
  ]) {
    assert.match(temporal, new RegExp(uncertainty));
  }
});

test('coordinates, allocations, and events remain distinct', () => {
  assert.match(temporal, /state coordinate is a numeric process field with an independently declared unit or measurement protocol/);
  assert.match(temporal, /other process fields may be categorical/);
  assert.match(temporal, /An allocation divides one named unit among mutually exclusive answers and therefore sums to one/);
  assert.match(temporal, /the set of events is not normalized/);
  assert.match(temporal, /Life Simulation does not add a third kind of semantic number/);
  assert.match(temporal, /Health and standing are concurrent categorical or externally measured process fields/);
});

test('anticipation, shocks, and adaptation are multiscale descriptions rather than a universal law', () => {
  assert.match(temporal, /Slow trajectories, shocks, and adaptation/);
  assert.match(temporal, /Anticipation belongs to a named perspective and cutoff/);
  assert.match(temporal, /drift, recovery, consolidation into a new baseline, instability or cascade, terminal transition, and anticipated transition/);
  assert.match(introduction, /Jump diffusion is one candidate family/);
  assert.match(introduction, /it is not a universal law/);
  assert.match(temporal, /does not infer an individual's trauma from a collective label/);
  for (const descriptor of [
    'Shock magnitude',
    'recovery half-life',
    'cascade fan-out',
    'delay from shock to slow-state change',
    'dependence of later event hazard on the preceding state',
  ]) {
    assert.match(temporal, new RegExp(descriptor));
  }
  assert.match(temporal, /Repeated events write to a memory or resource stock/);
  assert.match(temporal, /stock crosses a threshold/);
  assert.match(temporal, /feeds back into later sensitivity, recovery, available actions, or event hazard/);
  assert.match(temporal, /no-memory, linear-accumulation, and direct-model baselines/);
  assert.match(temporal, /change in a native-unit measured field, total variation between compatible Cuts, or a named categorical transition/);
  assert.match(temporal, /never a freely chosen scalar/);
});

test('actor-local state and estimates retain perspective boundaries', () => {
  assert.match(temporal, /\\mathcal M_a\(t\).*projection derived from representational Events under actor/);
  assert.match(temporal, /governing perspective root.*records permitted by the access policy/);
  assert.match(temporal, /\\mathcal M_a\^\*\(t\).*operative organization/);
  assert.match(temporal, /\\widehat\{\\mathcal M\}\^\{\*\}_\{o\\rightarrow a,j\}\(t\)/);
  assert.match(temporal, /World state, actor projection,\s+operative model, self-report, and observer hypotheses are separate objects/);
  assert.match(temporal, /A simulated decision for \$a\$ receives only records accessible/);
  assert.match(temporal, /equally informed latent baseline/);
  assert.match(temporal, /four epistemic objects must not collapse/);
  assert.match(temporal, /several observers' competing hypotheses/);
  assert.match(temporal, /whatever operative organization remains unknown/);
  assert.match(temporal, /not asserted to be a complete mind/);
});

test('the Meaning Model is a concise imported interface, not a duplicated construction method', () => {
  assert.match(meaning, /assumes, rather than re-derives, the Meaning Model/);
  assert.match(meaning, /registered Concepts and Things, time-bearing Events, typed Bindings, local Cuts, and Realizations/);
  assert.match(meaning, /companion paper also owns the construction surface/);
  assert.match(meaning, /progressive opening, world and concept preparation/);
  assert.match(meaning, /candidate acceptance and revision, narrative routes, rendering, read-back/);
  assert.match(meaning, /Meaning Model and Understanding Graph share addresses but not authority/);
  assert.match(meaning, /Dense cognitive annotation is optional/);
  assert.match(meaning, /alignment-facing training proposal it is recommended/);
  assert.match(meaning, /Sema provides content-addressed identity/);
  assert.match(meaning, /Every Cut has an Event parent and inherits context through edges declared \\textsf\{authority-parent\}/);
  assert.match(meaning, /Every record query returns its permitted parents and authority-parent paths to the governing context/);
  assert.match(meaning, /semantic weight is never returned or trained on in\s+isolation/);
  assert.doesNotMatch(source, /\\MM(?:Core|Profile)(?:Summary|Schema)/);
  assert.doesNotMatch(source, /\\section\{Constructing \\Book\{\}\}/);
  assert.doesNotMatch(source, /\\subsection\{Matched rendering comparison\}/);
  assert.doesNotMatch(source, /\\subsection\{Read-back agreement\}/);
  assert.doesNotMatch(source, /\\section\{Proposed Construction Transaction Contract\}/);
  assert.doesNotMatch(source, /\\section\{Provisional First-Construction Vocabularies\}/);
  assert.doesNotMatch(source, /AtomicWant|03-registry-and-prefix|10-prose-read-back/);
});

test('adaptive resolution cannot hide relevant fine-scale effects', () => {
  assert.match(resolution, /spend detail where it can change an active prediction/);
  assert.match(resolution, /Fine state may later be marginalized/);
  assert.match(resolution, /committed effects and identities cannot disappear/);
  assert.match(resolution, /fine dynamics can affect an active coarse prediction/);
  assert.match(resolution, /propagated statistically or the region must be opened/);
  assert.match(resolution, /fine state is authoritative, the coarse path is its declared aggregation/);
  assert.match(resolution, /finer state is sampled conditionally/);
  assert.match(resolution, /reaggregation changes an anchor or an intervention's observable effect/);
  assert.match(resolution, /Descendants that have not been instantiated are unmodeled state, not a Cut remainder/);
  assert.match(resolution, /adaptive semantic level of detail/);
  assert.match(resolution, /predictive, control, correction, or audit benefit minus the total cost/);
});

test('candidate functions face four tests and a direct-model baseline', () => {
  for (const rung of [
    'raw observation',
    'process indicator',
    'association on a held-out interval',
    'compact dynamics',
    'stability across environments or regimes',
    'independent replication',
  ]) {
    assert.match(functions, new RegExp(rung));
  }
  for (const phrase of [
    'compress repeated cases',
    'improve held-out prediction',
    'remain calibrated across declared regimes',
    'survive intervention or counterfactual tests',
  ]) {
    assert.match(functions, new RegExp(phrase));
  }
  for (const family of [
    'Mean reversion with shocks',
    'Point processes',
    'Change points and regimes',
    'Stochastic and network games',
    'Agent-based and system-dynamics models',
    'Diffusion of innovations',
    'Actuarial hazards',
    'Learned world models and neural simulators',
    'direct language-model transition',
  ]) {
    assert.match(functions, new RegExp(family));
  }
  assert.equal(
    functions.match(/\\paragraph\{([^}]+)\}/)?.[1],
    'The direct language-model transition.',
    'the direct-model baseline must precede optional candidate-law families',
  );
  assert.match(functions, /Every candidate family below/);
  assert.match(functions, /path may be retained while the added law is rejected/);
  assert.match(functions, /This paper supplies no general discovery procedure/);
  assert.match(functions, /support from independently held-out observations/);
  assert.match(functions, /Several rival dynamics may remain attached to one process/);
  assert.match(functions, /validity region/);
  assert.match(functions, /retire that version only for its tested scope/);
  for (const evidenceDomain of [
    'instrumented software',
    'energy and computation',
    'ecology',
    'scientific simulators',
  ]) {
    assert.match(functions, new RegExp(evidenceDomain));
  }
  assert.match(functions, /processes whose governing law or simulator is already known/);
  assert.match(functions, /correct mechanism with a misspecified law, persistence, a flexible learned model, and direct language-model continuation/);
  assert.match(functions, /Raw policy scores enter only after a declared normalization/);
});

test('narrative is an imported controlled laboratory', () => {
  assert.match(narrative, /accepted hidden state is available/);
  assert.match(narrative, /companion Meaning Model paper uses \\Book\{\}/);
  assert.match(narrative, /owns the historical preparation, world and concept construction/);
  assert.match(narrative, /completed manuscript and partial construction witness/);
  assert.match(narrative, /Independent read-back and the matched comparison remain prospective/);
  assert.match(narrative, /not yet the fully aligned export required here/);
  assert.match(narrative, /No earlier private Book run is evidence/);
  assert.match(narrative, /tests of inverse recovery, process-aware prediction, and generative consequence/);
  assert.match(narrative, /not the companion paper's construction or literary-quality experiment/);
});

test('evaluation prerequisites are claim-specific, non-compensatory, and prospective', () => {
  for (const gate of [
    'World-interface validity',
    'Temporal replay',
    'Candidate-dynamics value',
    'Process-sensorium value',
    'Generative inversion',
    'Prospective transfer',
    'Process-history learning',
    'Human-facing validity and risk',
  ]) {
    assert.match(evaluation, new RegExp(gate));
  }
  assert.match(evaluation, /tests below are grouped by claim, not a mandatory sequence/);
  assert.match(evaluation, /Source integrity, valid cutoffs, and applicable replay checks are prerequisites/);
  assert.match(evaluation, /Candidate-law discovery is optional/);
  assert.match(evaluation, /failed law does not invalidate learning from histories generated by another mechanism/);
  assert.match(evaluation, /learning from execution traces need not wait for transfer to personal data/);
  assert.match(evaluation, /Within a claimed use, success cannot compensate for a failed prerequisite or required safety test/);
  assert.match(evaluation, /Required negative findings include/);
  assert.match(evaluation, /westerbergTHL2026/);
  for (const frontier of [
    'native-stream-only model',
    'content-matched, untyped process summary',
    'coarse explicit temporal spine',
    'adaptive explicit track',
    'explicit-heavy condition',
  ]) {
    assert.match(evaluation, new RegExp(frontier));
  }
  assert.match(evaluation, /time-permuted track/);
  assert.match(evaluation, /state-scrambled track/);
  assert.match(evaluation, /sensing or annotation, state construction, validation, correction, storage and context, and training and inference compute/);
});

test('learning separates construction and world histories without collapsing evidence tracks', () => {
  for (const track of [
    'Observed',
    'Reported',
    'Actively elicited',
    'Inferred',
    'Model-completed',
    'Authored',
  ]) {
    assert.match(learning, new RegExp(track));
  }
  for (const view of [
    'Model-construction history',
    'Represented-world history',
    'Two linked training views',
  ]) {
    assert.ok(learning.includes(`\\paragraph{${view}.}`), `missing history distinction: ${view}`);
  }
  assert.match(learning, /Both histories can be studied at coarse and fine resolutions/);
  assert.match(learning, /a finished model can contain an entire evolving life/);
  assert.match(learning, /An endpoint example/);
  assert.match(learning, /a history example must additionally declare whether its sequence follows world development or model construction/);
  assert.match(learning, /A writer's construction input may legitimately include a planned ending that a character's earlier forecast must not receive/);
  assert.match(learning, /Rejected proposals remain construction records, not accepted world Events/);
  assert.match(learning, /without prescribing the source world's authoring procedure/);
  assert.match(learning, /Test chronological-world supervision, construction-history supervision, and their combination/);
  assert.match(learning, /held-out tasks for both continuation and model repair/);
  assert.match(learning, /Learning deeper personality models/);
  assert.match(learning, /teach when to deepen an account, change its questions, request evidence, or keep it coarse/);
  assert.match(learning, /fixed coarse profile with selectively refined profiles/);
  assert.match(learning, /\\subsection\{A four-way construction-history curriculum\}/);
  assert.match(learning, /Holding chronological-world supervision fixed/);
  for (const curriculum of [
    'accepted endpoints without their construction or correction histories',
    'all available histories admitted indiscriminately',
    'selected cutoff-safe histories containing invalid edits, repairs, and justified stopping decisions',
    'independent corrections of errors produced on-policy',
  ]) {
    assert.match(learning, new RegExp(curriculum));
  }
  assert.match(learning, /unavailable evidence, future leakage, malformed representation, predictive failure, excessive cost, or a safety boundary/);
});

test('the Fractal Intelligence adapter and matched trace experiment remain', () => {
  assert.match(learning, /westerbergFractal2026/);
  assert.match(learning, /Fractal Intelligence construct & Proposed Meaning Model representation/);
  assert.match(learning, /Generator--verifier separation/);
  assert.match(learning, /Matched trace experiment/);
  assert.match(learning, /unstructured-trace comparison isolates whether the grammar adds value/);
  assert.match(learning, /validates cognitive proprioception/);
  assert.match(learning, /cognitive proprioception.*learned ability to forecast and diagnose/);
  assert.match(learning, /actual candidate states, tool and solver invocations, gate decisions, resource use, and later outcomes/);
  assert.match(learning, /content-matched post-hoc rationale/);
  assert.match(learning, /does not require exposing private chain-of-thought/);
  assert.match(learning, /execution graph may contain thousands of nodes/);
  assert.match(learning, /run or task episode contains invocation Events/);
  assert.match(learning, /dependency and ordering are unweighted links/);
  assert.match(learning, /Overlapping durations do not sum/);
  assert.match(learning, /Critical path, parallelism, and depth are derived from the graph/);
  assert.match(learning, /next route or invocation, remaining duration and cost, eventual outcome or assessed quality/);
  assert.match(learning, /one closed world rather than a trace beside one/);
  assert.match(learning, /problem environment, artifacts, tests, resources, and a collective of Solver Things/);
  assert.match(learning, /An executing agent invokes a Solver from its own cutoff-safe actor projection/);
  assert.match(learning, /actions update the same accepted world/);
  assert.match(learning, /coupled evolution of the agents, their local understandings, the capabilities they invoke, and the world they change/);
  assert.match(learning, /not a complete mind or a record of hidden neural state/);
  assert.match(learning, /evaluator creates an assessment Event within its named perspective process/);
  assert.match(learning, /fit Cut parented by that Event/);
  assert.match(learning, /A decomposition that succeeds locally and fails jointly/);
  assert.match(learning, /both reserve the same inspector for the same hour/);
  assert.match(learning, /when to question a decomposition whose children appear successful/);
  assert.match(learning, /supported target is an information request or uncertainty, not foreknowledge/);
  assert.match(learning, /conceptual carve is not merely a task plan/);
  assert.match(learning, /independence does not establish mutually exclusive shares/);
  assert.match(learning, /From an episode to a reusable capability/);
  assert.match(learning, /both a repaired schedule and a callable structure/);
  assert.match(learning, /two complementary training paths/);
  assert.match(learning, /justified decisions not to decompose/);
  assert.match(learning, /open more detail in the world, obtain an observation, invoke a specialist, revise the capability boundary, or stop/);
  assert.match(learning, /gate rejection alone does not identify the cause of failure/);
});

test('the process sensorium and synthetic inversion are defined with the temporal object', () => {
  assert.match(temporal, /Local models and perspective.*A proposed process sensorium.*Synthetic bootstrap and generative inversion/);
  assert.match(temporal, /\\label\{eq:joint-process-prediction\}/);
  assert.match(temporal, /exact cutoff-visible native and accepted-world history/);
  assert.match(temporal, /selected coordinate, allocation, and derived-process path/);
  assert.match(temporal, /selected index of accepted discrete Events in that history/);
  assert.match(temporal, /query \$Q\$ fixes the process\s+identifiers, fields, applicable root paths, and resolution/);
  assert.match(temporal, /time-permuted and state-scrambled controls/);
  assert.match(temporal, /process-native intelligence/);
  assert.match(temporal, /not a claim of general intelligence/);
  assert.match(temporal, /\\Delta\\mathcal V/);
  assert.match(temporal, /concept definitions.*Cut or Binding profiles.*separate versioned model revision/);
  assert.match(temporal, /Ordinary Event, Cut, and Binding instances using the frozen registry enter through validated world updates; they do not change the registry/);
  assert.doesNotMatch(temporal, /\\Delta\\mathcal R/);
  assert.match(temporal, /Simulator-privileged targets during training, posterior inference from ordinary observations, and explicit sensors at deployment/);
  assert.match(temporal, /\\label\{eq:generative-inversion-method\}/);
  assert.match(temporal, /Cross-renderer recovery/);
  assert.match(temporal, /synthetic-centered bootstrapping and reality-centered validation/);
  assert.match(temporal, /Neither direction is declared universally harder/);
  assert.match(temporal, /not proof of its success on arbitrary books/);
  assert.match(temporal, /A connected Meaning Model of the corpus/);
  assert.match(temporal, /Accounts of the actual world can connect to shared people, places, institutions, and Events where evidence supports the identification/);
  assert.match(temporal, /incompatible accounts remain contestable/);
  assert.match(temporal, /Fictional and counterfactual worlds remain separate/);
  assert.match(temporal, /Coverage can grow across world history and geography while resolution deepens selectively/);
  assert.match(temporal, /New sources can also revise the coarse account rather than merely fill it in/);
  assert.match(temporal, /Updating the external Meaning Model is distinct from training model weights/);
  assert.match(temporal, /selected snapshots and construction histories can subsequently supply training examples under their own cutoffs/);
  assert.match(temporal, /intended numerical intuition/);
  assert.match(temporal, /A pound balance retains its external unit/);
  assert.match(temporal, /Generation also provides a way to explore candidate mechanisms/);
  assert.match(temporal, /revision of the represented processes and concepts/);
  assert.match(temporal, /selected correction histories can later train a successor learner/);
  assert.match(temporal, /independent observations and interventions must decide whether any candidate explains reality/);
  assert.match(temporal, /not a general algorithm for discovering laws/);
  assert.doesNotMatch(learning, /\\subsection\{(?:A proposed process sensorium|Synthetic bootstrap and generative inversion)\}/);
});

test('the first reservoir experiment has a bounded training, inference, and reopening contract', () => {
  assert.match(evaluation, /First experiment: a partially observed resource process/);
  assert.match(evaluation, /proposed protocol, not a reported experiment/);
  assert.match(evaluation, /Two reservoir Things.*litre-valued data/);
  assert.match(evaluation, /\\label\{eq:reservoir\}/);
  assert.match(evaluation, /neither receives hidden leak labels or unobserved bound contacts/);
  assert.match(evaluation, /joint categorical posterior/);
  assert.match(evaluation, /three unknown mode transitions, hence eight future mode paths/);
  assert.match(evaluation, /\\label\{eq:reservoir-loss\}/);
  assert.match(evaluation, /weighted auxiliary objective, not the joint likelihood/);
  assert.match(evaluation, /primary contrast \$U-N\$ tests privileged process supervision; \$T-U\$ tests input organization/);
  assert.match(evaluation, /Appendix~\\ref\{app:reservoir-protocol\}/);
  assert.doesNotMatch(evaluation, /\\paragraph\{Splits, budget, and scoring\.\}/);
  assert.match(trainingExport, /\\subsection\{Reservoir split, training, and scoring protocol\}/);
  assert.match(trainingExport, /\\label\{app:reservoir-protocol\}/);
  assert.match(trainingExport, /Paired variants never cross splits/);
  assert.match(trainingExport, /equal update counts alone are not equal compute/);
  assert.match(trainingExport, /group-bootstrap interval/);
  assert.match(trainingExport, /oracle.*never student inputs/);
  assert.match(trainingExport, /A complete reservoir forecast row/);
  assert.match(trainingExport, /\\label\{app:reservoir-row\}/);
  assert.match(trainingExport, /illustrative arithmetic, not experimental evidence/);
  assert.match(trainingExport, /Cutoff-visible input & Training or later scoring target/);
  assert.match(trainingExport, /At inference, mask private labels entirely and save the forecast distribution before revealing outcomes/);
  assert.match(resolution, /A bounded reopening test/);
  assert.match(resolution, /endpoint-total Wasserstein distance.*empty-onset probability difference/);
  assert.match(resolution, /return unresolved rather than fabricate a compatible refinement/);
  assert.match(resolution, /does not prove equivalence for arbitrary future policies/);
});

test('forecast and inversion claims have distinct empirical decision rules', () => {
  assert.match(temporal, /Before the outcome, a direction Cut declares whether its weights are a proposal policy or forecast probabilities/);
  assert.match(temporal, /can be scored once the outcome is observed/);
  assert.match(temporal, /Calibration is evaluated empirically across forecasts/);
  assert.doesNotMatch(normalized, /called a probability only after separate calibration/);
  assert.match(evaluation, /Recover only quantities identifiable under the observation policy/);
  assert.match(evaluation, /alternative states, not be scored as failed exact recovery/);
  assert.match(evaluation, /mirrored worlds have identical native histories and opposite leak locations/);
  assert.match(evaluation, /Leak attribution must remain \$1\/2\$/);
  assert.match(evaluation, /aligned-minus-scrambled advantage/);
  assert.match(evaluation, /scrambled data may retain a generic information benefit while aligned data add a further gain/);
  assert.match(evaluation, /untyped condition matching the typed condition rejects a typing advantage/);
  assert.match(evaluation, /Success only with explicit-heavy state challenges adaptive efficiency/);
  assert.match(measurement, /A pretrained model may already know/);
  assert.match(measurement, /retrospective reconstruction, not a clean prospective forecast/);
  assert.match(measurement, /True prospective evaluation locks predictions before the reveal occurs/);
  assert.match(measurement, /a repeatedly inspected longitudinal set becomes a development set/);
});

test('authority and access remain distinct from temporal ancestry in queries and exports', () => {
  assert.match(measurement, /estimate Events within the rater's named inner perspective process beneath their lifecycle/);
  assert.match(measurement, /self-perspective facet Cut whose parent Event lies under that person's named inner perspective process/);
  assert.match(meaning, /same nearest context root; otherwise the record is rejected as ambiguous/);
  assert.match(meaning, /Temporal containment, occurrence, reference, evidence, and grounding alone confer neither authority nor access/);
  assert.match(meaning, /Access and the evidence cutoff are checked before traversal or serialization/);
  assert.match(meaning, /reference exposes neither private content nor private ancestry/);
  assert.match(meaning, /complete permitted local Cut.*or denies the Cut view as a whole/);
  assert.match(meaning, /Realization target links do not authorize traversal of their targets/);
  assert.match(trainingExport, /permitted authority-parent paths to its unique governing context, separately identified temporal ancestry/);
  assert.match(trainingExport, /Access and the row cutoff are applied before traversal or serialization/);
  assert.match(trainingExport, /If the complete view is unavailable, the Cut view is denied/);
  assert.match(trainingExport, /keyed sibling answers and weights, remainder, optional conditioning address, constraints, and recomposition rule/);
});

test('reality-facing measurement is chronological, contestable, and governed', () => {
  assert.match(measurement, /preceding sections used authored worlds and instrumented problem-solving histories/);
  assert.match(measurement, /A reality-facing branch asks what comparable histories can establish about people/);
  assert.match(measurement, /preserve when evidence appeared/);
  assert.match(measurement, /inferred path and does not manufacture an earlier observation/);
  assert.match(measurement, /fixed longitudinal evaluation set/);
  assert.match(measurement, /lower prospective error and better calibration/);
  assert.match(measurement, /meaningful consent, purpose and access limits/);
  assert.match(measurement, /neither validates a diagnosis nor uncovers a uniquely true hidden self/);
});

test('evaluation of people remains episode-level and does not self-certify', () => {
  assert.match(alignment, /Deciding and revising over time/);
  assert.match(alignment, /choose whether to act, ask, wait, or decline/);
  assert.match(alignment, /compare the consequences with its forecast and revise the plan/);
  assert.match(alignment, /remain separately visible rather than disappear into one utility total/);
  assert.match(alignment, /without a new wisdom primitive/);
  assert.match(alignment, /Understanding another person's wants confers no authority to choose for them/);
  assert.match(alignment, /same observations and history in unstructured form, at matched cost/);
  assert.match(alignment, /without increasing manipulation or overriding expressed choices/);
  for (const frame of ['Criterion', 'Ipsative', 'Norm-referenced']) {
    assert.match(alignment, new RegExp(frame));
  }
  assert.match(alignment, /organized failures from lucky successes/);
  assert.match(alignment, /not a lifecycle scalar/);
  assert.match(alignment, /Instrumental intelligence neither validates an objective nor entails kindness/);
  assert.match(alignment, /self-evaluation hypothesis, not self-certifying knowledge/);
  assert.match(alignment, /An optimizing system can learn to game its own score/);
  assert.match(alignment, /F_C\(H_\{\\tau\},G_C,v\)/);
  assert.match(alignment, /full history visible under the evidence policy/);
  assert.match(alignment, /assessment Event .* beneath\s+the evaluator's declared perspective process/s);
  assert.match(alignment, /linked \\emph\{about\} both the episode and its Realization/);
  assert.match(alignment, /fit Cut parented by an assessment Event/);
});

test('related work retains trajectory and program-induction comparators', () => {
  for (const key of [
    'jockers2015syuzhet',
    'reagan2016arcs',
    'iyyer2016relationships',
    'brahman2020emotion',
    'ellis2021dreamcoder',
    'nodelmanSheltonKoller2002ctbn',
    'rubanova2019latentOde',
    'vanDerAalst2016processMining',
    'locatello2020slotAttention',
    'hintonDayanFreyNeal1995wakeSleep',
    'xie2025chatts',
    'christ2024emotionalTrajectories',
    'wang2026codeAsWorlds',
  ]) {
    assert.match(related, new RegExp(key));
    assert.ok(bibliography.includes(`{${key},`), `missing bibliography entry: ${key}`);
  }
  assert.match(related, /selected paths with accepted discrete Events/);
  assert.match(related, /DreamCoder alternates program induction, recognition, and library learning/);
  assert.match(related, /Continuous-time graphical and latent state-space models/);
  assert.match(related, /Process mining reconstructs executions from event logs/);
  assert.match(related, /Wake--sleep learning is an earlier analysis-by-synthesis scheme/);
  assert.match(related, /does not claim to originate text--number pairing/);
  assert.match(related, /narrative-world construction, inverse corpus enrichment, progressive multiscale state/);
  assert.match(related, /not evidence that more generated examples necessarily improve learning/);
});

test('alignment claims and negative results remain scoped to their tested uses', () => {
  assert.match(alignment, /some failures of assistance may arise/);
  assert.match(alignment, /could help distinguish/);
  assert.match(alignment, /worker's refusal of another shift/);
  assert.match(alignment, /Those are competing readings until evidence distinguishes them/);
  assert.match(alignment, /richer emotional understanding that guides conduct, not privileged access to a hidden mind/);
  assert.match(alignment, /not a demonstrated solution or a replacement for post-training, access controls, and independent oversight/);
  assert.match(limitations, /might support more considerate assistance/);
  assert.match(conclusion, /Meaning Model governs what the evolving records mean and how proposed changes are accepted/);
  assert.match(conclusion, /Life Simulation studies their temporal behavior and learning value throughout that construction/);
  assert.match(conclusion, /from that tested training or prediction condition/);
  assert.match(conclusion, /does not by itself reject their use in authoring, explanation, or control/);
  assert.doesNotMatch(normalized, /begins (?:after such a world representation|once such a time-indexed world) is available/);
});

test('the integrated alignment profile uses a continuing Reader and tests conduct rather than recital', () => {
  assert.match(alignment, /The combined training loop and its tests/);
  assert.match(alignment, /continuing synthetic Reader carries the same revisable Understanding Graph/);
  assert.match(alignment, /Each generated Reader thought block begins with the full Reader Core/);
  assert.match(alignment, /context-sensitive \\emph\{Refraction\}/);
  assert.match(alignment, /exact native spans are paired with evolving explanatory visual or schematic tracks/);
  assert.match(alignment, /proposed construction method for those tracks/);
  assert.match(alignment, /connected historical and geographical Meaning Model/);
  assert.match(alignment, /fictional worlds retain their separate contexts/);
  assert.match(alignment, /Understanding Graph records how reading another source changes the Reader's interpretation, not only what facts were added/);
  assert.match(alignment, /an abstract animation can show a relation/);
  assert.match(alignment, /promised payment not arriving/);
  assert.match(alignment, /\\label\{tab:payment-training-views\}/);
  assert.match(alignment, /Forecast before notice/);
  assert.match(alignment, /Revise after notice/);
  assert.match(alignment, /nonreceipt does not establish intention/);
  assert.match(alignment, /proposed training rows, not an implemented export/);
  assert.match(alignment, /rendered pixels or visual latents/);
  assert.match(alignment, /consistency, not independent corroboration/);
  assert.match(alignment, /not a guarantee of one tokenizer token/);
  assert.match(alignment, /targets are either predicted from the same closed prefix or exposed in a declared order/);
  assert.match(alignment, /Durable care is the alignment objective, not an automatic consequence/);
  assert.match(alignment, /THL separately permits later outcomes to inform targets for earlier predictions while keeping those outcomes out of earlier Student inputs/);
  assert.match(alignment, /Cognitive annotation remains optional for general world representation/);
  assert.match(alignment, /continuing Reader and its evaluative orientation are central, not decorative additions/);
  assert.match(alignment, /Reader-based training is intended to inform the Student's later writing, dialogue, and action/);
  assert.match(alignment, /writer-side track of documented world and scene-construction choices/);
  assert.match(alignment, /additional supervision is distinct from the intended transfer of Reader-based learning into writing and conduct/);
  assert.match(alignment, /intended empathic signal/);
  assert.match(alignment, /nor does predicting the track establish that the Student has feelings or will act with care/);
  assert.match(alignment, /Improvement on prediction alone does not establish safer behavior/);
  assert.match(alignment, /A system can understand a vulnerability and exploit it/);
  assert.match(alignment, /ordering is block-causal/);
  assert.match(alignment, /first close a source interval/);
  assert.match(alignment, /cannot rewrite the source block or enter a prediction whose cutoff preceded it/);
  for (const claim of [
    'Understanding changes decisions',
    'The orientation is used rather than recited',
    'Improvement preserves the intended orientation',
  ]) {
    assert.match(alignment, new RegExp(claim));
  }
  assert.match(alignment, /Recitation-only controls/);
  assert.match(alignment, /Preserved Core text or grounding hashes alone do not pass/);
  assert.match(alignment, /integrated Student experiment and its stability claims have not been demonstrated/);
});

test('cross-program applications retain new domains and refer back to established learning loops', () => {
  assert.match(applications, /Interactive worlds and virtual reality/);
  assert.match(applications, /persistent world behind an embodied experience/);
  assert.match(applications, /advance their processes between visits/);
  assert.match(applications, /Rendering, tracking, and low-latency interaction would remain the VR system's responsibility/);
  assert.match(applications, /Ontology of the Alien/);
  assert.match(applications, /westerbergOntology2026/);
  assert.match(applications, /formulate an unfamiliar causal regime/);
  assert.match(applications, /simulate its temporal behavior/);
  assert.match(applications, /ontology is active search state, not just an archive/);
  assert.match(applications, /specify which causal relation the next proposal must change/);
  assert.match(applications, /released controller directs candidate-level search/);
  assert.match(applications, /governing which causal worlds to generate remains proposed/);
  assert.match(applications, /candidate ontology and evidence available before a proposal/);
  assert.match(applications, /teach where to explore and when the search categories themselves need revision/);
  assert.match(applications, /Fractal Intelligence addresses how to organize a solution/);
  assert.match(applications, /not improved search quality or a trained exploration policy/);
  assert.match(learning, /Temporal Hindsight Learning supplies a complementary use of that history/);
  assert.match(learning, /westerbergTHL2026/);
  assert.match(learning, /Student still sees only the task, records, and options available at that earlier cutoff/);
  assert.doesNotMatch(applications, /\\paragraph\{(?:Corpus and multimodal process annotation|Problem-solving telemetry|Personal and institutional models|Reader and Writer training)\.\}/);
  assert.match(applications, /Applications developed above/);
  for (const label of ['sec:combined-training', 'sec:problem-solving-events', 'sec:measurement']) {
    assert.ok(applications.includes(`\\ref{${label}}`), `missing application cross-reference: ${label}`);
  }
  assert.match(applications, /institutional policies, roles, resources, and decisions/);
  assert.match(applications, /causal follow-through is the proposed route to more lifelike organization/);
  assert.match(applications, /target-blind generation must remain distinct from a target-aware construction or transfer adapter/);
  assert.match(applications, /current textual regimes are not already executable simulations/);
  assert.match(applications, /Compulsory substrate use/);
  assert.match(applications, /only that predicted substrate, without a direct token-history bypass/);
  assert.match(applications, /Imagining the Corpus and the present joint predictor retain a direct language-history route/);
  assert.match(applications, /Neither compulsory routing nor joint supervision guarantees semantic understanding/);
});

test('music connects two temporal histories without claiming an implemented adapter', () => {
  assert.match(applications, /Music and production histories/);
  assert.match(applications, /song time.*within one render.*production time.*edits, auditions, rejected alternatives, and successive renders/);
  assert.match(applications, /Neither a set of tracks nor an audio mixture becomes a normalized Cut/);
  assert.match(applications, /Meaning Model supplies their identities, relations, and version history/);
  assert.match(applications, /Life Simulation studies how their paths and revisions connect to the sound/);
  assert.match(applications, /change an envelope's release.*predict the changed decay and overlap/);
  assert.match(applications, /Intentions and listener judgments retain their reported or interpreted status/);
  assert.match(applications, /cannot use later edits or audition judgments/);
  assert.match(applications, /inverse predictions must retain alternatives/);
  assert.match(applications, /audio-only learning, audio with terminal settings, and audio with aligned process and edit histories/);
  assert.match(applications, /matched time-permuted or routing-scrambled controls/);
  assert.match(applications, /no music adapter or training corpus is supplied here/);
});

test('the executor boundary does not imply the proposed system exists', () => {
  assert.match(executor, /bounded family of scalar laws/);
  assert.match(executor, /does not yet provide a general hybrid event\/continuous-process runtime/);
  assert.match(executor, /learn transition functions from histories/);
  assert.match(executor, /select adaptive resolution/);
  assert.match(executor, /joint predictor/);
  assert.match(executor, /no end-to-end export currently joins those definitions, evolving process paths, native streams, and cutoff-safe correction histories/);
});

test('the training export is cutoff-safe and process-centered', () => {
  assert.match(trainingExport, /Each row names an immutable information cutoff and one prospective task/);
  assert.match(trainingExport, /later native observation, continuous-state interval, discrete event/);
  assert.match(trainingExport, /Omitted annotation means unmodeled or unannotated, not false/);
  assert.match(trainingExport, /aligns the next native interval \$Y\$, selected process continuation \$X\$, discrete events \$E\$/);
  assert.match(trainingExport, /appended without mutating the original input or forecast/);
  assert.match(trainingExport, /\\Delta\\mathcal V/);
  assert.doesNotMatch(trainingExport, /\\Delta\\mathcal R/);
});

test('stale private construction artifacts never re-enter the canonical paper', () => {
  assert.doesNotMatch(source, /\bV20\b/);
  assert.doesNotMatch(source, /old Book|old run|August 29|Everest witness|Mara and Jonas|colony ship/i);
  assert.doesNotMatch(source, /1,617|1,032/);
  assert.match(narrative, /No earlier private Book run is evidence/);
  assert.match(readme, /Only individually allowlisted files enter the export/);
  assert.match(readme, /curated accepted Book/);
  assert.match(readme, /Meaning\s+Model construction, not to Life Simulation's proposed learning experiments/);
});

test('required companion references exist', () => {
  for (const key of [
    'westerbergMeaning2026',
    'westerbergOntology2026',
    'westerbergTHL2026',
    'westerbergFractal2026',
    'westerbergImagining2026',
    'westerbergUnderstanding2026',
    'westerbergEntangled2026',
    'westerbergSema2026',
    'westerbergSTLM2026',
  ]) {
    assert.match(source, new RegExp(key));
    assert.match(bibliography, new RegExp(`@\\w+\\{${key},`));
  }
});

test('companion bibliography titles match the current papers', () => {
  assert.match(bibliography, /The Meaning Model: Constructing Worlds and Stories at Progressive Resolution/);
  assert.match(bibliography, /Life Simulation: Learning from Worlds and Their Construction/);
});

test('the public structure map and release guide preserve the paper boundary', () => {
  assert.match(structure, /Paths before laws/);
  assert.match(structure, /Seven-stage bootstrap/);
  assert.match(structure, /Meaning Model owns/);
  assert.match(structure, /Life Simulation owns/);
  assert.match(structure, /Detailed Book construction, rendering\/read-back protocol/);
  assert.match(structure, /Observation is not generation/);
  assert.match(structure, /History selection is experimental/);
  assert.match(structure, /Reader order is block-causal/);
  assert.match(structure, /Forecast semantics precede outcomes/);
  assert.match(structure, /two-reservoir/);
  assert.match(structure, /aligned-minus-scrambled/);
  assert.match(structure, /Access and cutoff filtering precede query traversal/);
  assert.match(structure, /Retrospective reconstructions using pretrained models/);
  assert.match(structure, /Two linked ambitions/);
  assert.match(structure, /claim-specific prerequisites/);
  assert.match(structure, /song time.*production time/s);
  assert.match(structure, /Decisions and correction/);
  assert.match(structure, /full Reader Core/);
  assert.match(structure, /Refraction/);
  assert.match(structure, /Substrate Language Modeling/);
  assert.match(structure, /successor-like transfer/);
  assert.match(releaseGuide, /exactly one initial\s+commit/);
  assert.match(releaseGuide, /excludes private development\s+history/);
  assert.match(releaseGuide, /old constructions and checkpoints/);
  assert.match(releaseGuide, /no npm\s+dependencies or sibling checkout/);
});
