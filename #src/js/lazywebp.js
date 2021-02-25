let sourceWebp = document.querySelectorAll('source');
let sourceItem = sourceWebp[i];

sourceWebp.forEach(function (sourceItem) {
	sourceItem.classList.add('lazyload');
  });


// sourceWebp.forEach(function(i) {
// 	console.log(i);
// 	i.classList.add('.lazyload');
// });

// sourceItem.classList.add('lazyload');