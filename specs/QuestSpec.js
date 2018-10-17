const answers = [
  'ANSWER', 'WATER', 'CARL JOHNSON', '4', 'BITCOIN', 'RED', 'IPHONE', '34', '22563', 'CHESS', 'RIO DE JANEIRO'
];

let quest = 1;

export default function(spec) {

  spec.describe('Loading quest', () => {
    spec.it('shows the spinner to loading', async () => {
      await spec.exists('Quest.ActivityIndicator');
    });
  });

  spec.describe('Answer question', () => {

    spec.it('input random answers', async () => {
      while(spec.exists('Quest.TextInput')){
        await spec.fillIn('Quest.TextInput', answers[Math.floor(Math.random() * answers.length)]);
        await spec.pause(1010);
      };
    });
  });

  spec.describe('Restart questions', () => {
    spec.it('press on restart', async () => {
      await spec.exists('Quest.ButtonRestart');
      await spec.press('Quest.ButtonRestart');
    });
  });
}