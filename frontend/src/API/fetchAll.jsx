export const fetchOverallSent = async () => {
  const res = await fetch("http://127.0.0.1:8000/overall");

  const data = await res.json();

  return data;
};
