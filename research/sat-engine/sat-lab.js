/* Educational 3-CNF truth assignment; NOT the SAT Engine solver or benchmark. */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-sat-lab]').forEach(lab => {
    const lang = lab.getAttribute('data-sat-lang') === 'en' ? 'en' : 'es';
    const controls = [...lab.querySelectorAll('input[data-sat-variable]')];
    const rows = [...lab.querySelectorAll('[data-sat-clause]')];
    const terms = [
      [['A', false], ['B', false], ['C', false]],
      [['A', true], ['B', false], ['C', true]],
      [['A', false], ['B', true], ['C', false]],
      [['A', true], ['B', true], ['C', true]]
    ];
    if (controls.length !== 3 || rows.length !== terms.length) return;
    function render() {
      const value = {};
      controls.forEach(control => {
        value[control.dataset.satVariable] = control.checked;
        const output = control.closest('label')?.querySelector('output');
        if (output) output.textContent = lang === 'es'
          ? (control.checked ? 'Verdadero' : 'Falso')
          : (control.checked ? 'True' : 'False');
      });
      let satisfiedCount = 0;
      terms.forEach((clause, index) => {
        const satisfied = clause.some(([variable, negated]) =>
          negated ? !value[variable] : !!value[variable]
        );
        if (satisfied) satisfiedCount++;
        rows[index].dataset.satisfied = String(satisfied);
        const status = rows[index].querySelector('[data-sat-status]');
        if (status) status.textContent = lang === 'es'
          ? (satisfied ? 'Cumple' : 'No cumple')
          : (satisfied ? 'Satisfied' : 'Unsatisfied');
      });
      const progress = lab.querySelector('progress');
      if (progress) progress.value = satisfiedCount;
      const count = lab.querySelector('[data-sat-count]');
      if (count) count.textContent = satisfiedCount + ' / ' + terms.length;
      const summary = lab.querySelector('[data-sat-summary]');
      if (summary) summary.textContent = satisfiedCount === terms.length
        ? (lang === 'es' ? 'Esta asignación satisface las cuatro cláusulas: SAT.' : 'This assignment satisfies all four clauses: SAT.')
        : (lang === 'es' ? 'Esta asignación todavía no satisface toda la fórmula.' : 'This assignment does not yet satisfy the entire formula.');
    }
    controls.forEach(input => input.addEventListener('change', render));
    lab.querySelectorAll('button[data-sat-action]').forEach(button => {
      button.addEventListener('click', () => {
        // Example satisfying assignment for this fixed demonstration only: A=true, B=false, C=false.
        const showExample = button.dataset.satAction === 'example';
        controls.forEach(input => {
          input.checked = showExample && input.dataset.satVariable === 'A';
        });
        render();
      });
    });
    render();
  });
});
