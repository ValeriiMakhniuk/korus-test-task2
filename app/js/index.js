(() => {
  const wordend = (number, textForms) => {
    const n = Math.abs(number) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return textForms[2];
    if (n1 > 1 && n1 < 5) return textForms[1];
    if (n1 === 1) return textForms[0];
    return textForms[2];
  };

  const render = (state) => {
    const container = document.querySelector('.container');
    if (state.submitted) {
      const isNotAnswered = state.answeredCount === 0;
      const answerDiff = state.questionsCount - state.answeredCount;
      const forms = ['вопрос', 'вопроса', 'вопросов'];
      if (isNotAnswered) {
        container.innerHTML = `<p>Вы не ответили ни на один вопрос</p>`;
      } else if (answerDiff === 0) {
        container.innerHTML = `<p>Вы ответили на все вопросы</p>`;
      } else {
        container.innerHTML = `<p> Вы ответили на ${
          state.answeredCount
        } ${wordend(
          state.answeredCount,
          forms
        )} и не ответили на ${answerDiff} ${wordend(answerDiff, forms)}`;
      }
    }
  };

  const state = {
    questionsCount: 2,
    answeredCount: 0,
    submitted: false,
  };

  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = Object.fromEntries(formData);
    state.answeredCount = Object.values(entries).filter(
      (value) => value
    ).length;
    state.submitted = true;
    render(state);
  });
})();
