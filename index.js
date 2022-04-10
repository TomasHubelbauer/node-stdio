import child_process from 'child_process';
import stream from 'stream';

const cp = child_process.exec('node test');

function defer() {
  let resolve;
  let reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  return { promise, resolve, reject };
}

let deferred = defer();

/** @this {stream.Readable} */
async function read(/** @type {number} */ size) {
  if (!deferred) {
    return;
  }

  this.push(await deferred.promise + '\n');
}

cp.stdout.on('data', chunk => {
  // Note that either `answer⏎question ` or just `question ` chunks might come
  for (const line of chunk.split('\n')) {
    switch (line) {
      case 'What is your favorite color? ': {
        deferred.resolve('blue');
        deferred = defer();
        break;
      }
      case 'What is your favorite animal? ': {
        deferred.resolve('rabbit');
        deferred = defer();
        break;
      }
      case 'What is your favorite season? ': {
        deferred.resolve('autumn');
        deferred = defer();
        break;
      }
      case 'What is your favorite number? ': {
        deferred.resolve('seven');
        deferred = null;
        break;
      }
    }
  }
});

cp.stdout.pipe(process.stdout);
new stream.Readable({ read }).pipe(cp.stdin);
