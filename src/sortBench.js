// Task: sort an array of 0 and 1.
// i.e. // [0, 1, 1, 0, 1, 0] => [0, 0, 0, 1, 1, 1]

const {
  time: { duration },
  array: { shuffle },
} = require('danrusu-js-utils');

// complexity: n*n
const sortNN = array => {
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        sorted = false;
      }
    }
  }
};

// complexity: n
const sortN = array => {
  let left = 0;
  let right = array.length - 1;
  let itterations = 0;

  for (let i = left; i < right; i++) {
    itterations++;
    let isZeroFoundOnTherightSide;
    if (array[i] === 1) {
      for (let j = right; j > i; j--) {
        itterations++;
        if (array[j] === 0) {
          [array[i], array[j]] = [array[j], array[i]];
          left = i;
          right = j - 1;
          isZeroFoundOnTherightSide = true;
          break;
        }
      }
      if (!isZeroFoundOnTherightSide) {
        break;
      }
    }
  }
};

const benchmark = async () => {
  const ARRAY_SIZES = [
    10, 100, 1_000, 10_000, 100_000,
    //1_000_000
  ];

  for (const size of ARRAY_SIZES) {
    const binaryArray = shuffle(
      Array(size)
        .fill(0, 0, size / 2)
        .fill(1, size / 2, size),
    );
    const arrayToSort1 = [...binaryArray];
    const arrayToSort2 = [...binaryArray];
    const arrayToSort3 = [...binaryArray];

    await duration(`JS Array.sort array[${size}]`, () => {
      arrayToSort1.sort((x, y) => x - y);
    });

    await duration(`sort[n] array[${size}]`, () => {
      sortN(arrayToSort2);
    });

    await duration(`sort[n*n] array[${size}]`, () => {
      sortNN(arrayToSort3);
    });

    console.log();
  }
};

benchmark();
