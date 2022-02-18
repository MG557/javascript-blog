'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
  */
{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
  
    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    // console.log('clickedElement (with plus): ' + clickedElement);

    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);
    
    /* [DONE] remove class 'active' from all articles */
 
    const activeArticles = document.querySelectorAll('.posts article.active');
    //  .titles a.active
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    
    console.log('click articleSelector:', articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('click targetArticle:', targetArticle);

    /* [DONE] add class 'active' to the correct article */
    //document.querySelector('href').classList.add('active');
   
    targetArticle.classList.add('active'); 
  // eslint-disable-next-line semi
  }

  /*const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
   for(let link of links){
      link.addEventListener('click', titleClickHandler);
  }
  */


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
 
  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(){
    console.log('function generateTitleLinks!');
   
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    //clearMessages();
    
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';
    for(let article of articles){
      article.classList.remove('active');
      //let html = '';
      //console.log('html', html);
      
      /* get the article id */

      const articleId = article.getAttribute('id');
      console.log('articleId', articleId);

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('articleTitle', articleTitle);
     
      /* get the title from the title element */
      
      article.classList.add('active');
      
      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
     
      /* insert link into titleList */
     
      //titleList.innerHTML = titleList.innerHTML + linkHTML;
      //console.log('titlelist', titleList);
      titleList.insertAdjacentHTML('beforeend', linkHTML);
      
      html = html + linkHTML;
      
    }
    //console.log('html', html);
      
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }
 
  generateTitleLinks();
}