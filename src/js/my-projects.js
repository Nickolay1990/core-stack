const loadMoreBtn = document.querySelector('.load-more');
const projectItems = document.querySelectorAll('.list-item');

let visibleCount = 3;
const itemsPerClick = 3;
let isExpanded = false;

function showItems() {
  projectItems.forEach(function(item, index) {
    if (index < visibleCount) {
      item.classList.add('show');
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
      item.classList.remove('show');
    }
  });
}

function scrollToNewItem(startIndex) {
  const targetItem = projectItems[startIndex];
  if (targetItem) {
    targetItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function handleLoadMoreClick() {
  if (!isExpanded) {
    const previousVisibleCount = visibleCount;
    visibleCount += itemsPerClick;

    if (visibleCount >= projectItems.length) {
      visibleCount = projectItems.length;
      isExpanded = true;
      loadMoreBtn.textContent = 'Show less';
    }

    showItems();
    scrollToNewItem(previousVisibleCount);

  } else {
    visibleCount = 3;
    showItems();

    const firstCard = projectItems[0];
    if (firstCard) {
      firstCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    loadMoreBtn.textContent = 'Load more';
    isExpanded = false;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  showItems();
  loadMoreBtn.addEventListener('click', handleLoadMoreClick);
});