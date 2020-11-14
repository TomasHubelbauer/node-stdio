# Node standard I/O

This repository demonstrates how to use Node Streams to communicate with a child
process using standard I/O streams.

There are two Node files: `index.js` and `test.js`.

`test.js` is the process we want to communicate with. `index.js` starts it thru
`child_process.exec`.

`test.js` is a simple process which asks 4 different questions using `readline`
and prints the answers the user provides. You can try it standalone by running
`node test`. It looks something like this:

```
> What is your favorite color?
< blue
> Your favorite color is blue
> What is your favorite animal?
< rabbit
> Your favorite animal is rabbit
> What is your favorite season?
< autumn
> Your favorite season is autumn
> What is your favorite number?
< seven
> Your favorite number is seven
```

`>` demarcates lines written to the standard output by the process.
`<` demarcates lines written to the standard input of the process by the user.

In the repository I take a look at how when a process is started from Node using
programmatic means, how can we answer these questions posed by the process also
using programmatic means, without having to defer to a human user. Beyond that,
I show how to make the answer really be based on the questions posed so far,
instead of just feeding the processed a prepared list of lines without context.
This means that the solution shown here will continue to work even if the order
of the questions posed by the child process is shuffled.

`index.js` is the file implementing this communication with the child process.
It listens for the questions asked by `test.js` and answers them automatically.
It redirects `test.js`'s standard output to its own standard output, so the
result can be seen. Its standard output when run using `node .` looks something
like this:

```
What is your favorite color? Your favorite color is blue
What is your favorite animal? Your favorite animal is rabbit
What is your favorite season? Your favorite season is autumn
What is your favorite number? Your favorite number is seven
Thank you.
```
