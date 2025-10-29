export const addThousandSeparators = (num) => {
  if (num == null || isNaN(num)) return "";

  const numStr = num.toString();
  const parts = numStr.split(".");

  let integerPart = parts[0];
  const fractionalPart = parts[1];

  // handle negative numbers
  const isNegative = integerPart.startsWith("-");
  if (isNegative) {
    integerPart = integerPart.slice(1);
  }

  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);

  if (otherNumbers !== "") {
    const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    integerPart = formattedOtherNumbers + "," + lastThree;
  } else {
    integerPart = lastThree;
  }

  // combine integer and fractional parts
  const formatted = fractionalPart ? integerPart + "." + fractionalPart : integerPart;

  return isNegative ? "-" + formatted : formatted;
};
