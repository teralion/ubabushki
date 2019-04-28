
export const isDigitNumber = v => !Number.isNaN(parseFloat(v)) && Number.isFinite(v);

export const isWholeDigitNumber = v => (parseFloat(v) % 1 === 0);
