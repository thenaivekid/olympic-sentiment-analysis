export const fetchOverallSent = async () => {
  const res = await fetch("https://social-media-ashok.onrender.com/overall");

  const data = await res.json();

  return data;
};
