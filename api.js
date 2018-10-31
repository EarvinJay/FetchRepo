export const fetchData = async (i) => {
  try {
    const response = await fetch("https://api.github.com/search/repositories?q=" + i + "&sort=date&order=desc");
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
