const input = document.getElementById('input');
const btn = document.getElementById('btn');
const grid = document.getElementById('grid');

async function search() {
  const country = input.value.trim();
  if (!country) return;

  grid.innerHTML = '';

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
    const data = await response.json();

    if (data.meals) {
      data.meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="350">
          <p>${meal.strMeal}</p>
        `;
        grid.appendChild(mealDiv);
      });
    } else {
      grid.innerHTML = '<p>No meals found.</p>';
    }
  } catch (error) {
    console.error('Error:', error);
    grid.innerHTML = '<p>Something went wrong.</p>';
  }
}

btn.addEventListener('click', search);
input.addEventListener('keypress', e => e.key === 'Enter' && search());