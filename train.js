const mnist = require('mnist');
const brain = require('brain.js');
const { writeFileSync } = require('fs');
const { join } = require('path');

const set = mnist.set(10000, 3000);

const net = new brain.NeuralNetwork({
  activation: 'sigmoid',
  hiddenLayers: [20]
});

console.log('Starting training...');
const trained = net.train(set.training, {
  log: true,
  logPeriod: 5,
  errorThresh: 0.005
});

console.log('Training complete', trained);

console.log('Running checks...');
const checks = set.test.reduce((score, { input, output }) => {
  const result = net.run(input);
  const highestIndex = result.reduce(
    (max, x, i, arr) => x > arr[max] ? i : max,
    0
  );

  if(output[highestIndex]) {
    score.correct++;
  } else {
    score.incorrect++;
  }

  return score;
}, { correct: 0, incorrect: 0 })

console.log('Check results', checks);

writeFileSync(
  join(__dirname, 'run.js'),
  net.toFunction().toString().replace('anonymous', 'run')
);
