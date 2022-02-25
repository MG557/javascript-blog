'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
  */
{
  /* titleClickHandler M6 ////////////////////////////////////////////////////////////////////////////*/
  /* 1.0) titleClickHandler */

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
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

  /* generateTitlelinks M.6//////////////////////////////////////////////////////////////////*/


  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = ''){
    console.log('function generateTitleLinks!');

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    //clearMessages();

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    //const articles = document.querySelectorAll(optArticleSelector);
    console.log('articles' , articles);
    let html = '';
    for(let article of articles){
      //article.classList.remove('.titles');
      //let html = '';
      //console.log('html', html);

      /* get the article id */

      const articleId = article.getAttribute('id');
      console.log('articleId', articleId);

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('articleTitle', articleTitle);

      /* get the title from the title element */

      //article.classList.add('.post');

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

  /* generateTags M7.2//////////////////////////////////////////////////////////////////////// */
  /* 2.0) generateTags */
  // eslint-disable-next-line no-inner-declarations
  function calculateTagsParams(tags) {
    const params = {min: 100 , max: 0 };

    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  }

  // eslint-disable-next-line no-inner-declarations
  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix , classNumber;
  }

  // eslint-disable-next-line no-inner-declarations
  function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const articleTagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log('articleTagsWrapper', articleTagsWrapper);

      /* make html variable with empty string */
      // eslint-disable-next-line no-unused-vars
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('articleTags', articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('articleTagsArray', articleTagsArray);

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
      /* generate HTML of the link */

        //const linkTAG = '<li><a href="#tag-">' + tag + '</a></li>';
        const linkTAG = '<li><a href ="#tag-' + tag + '">' + tag + '</a></li>';
        console.log('linkTAG', linkTAG);

        //<li><a href="#tag-cat">cat</a></li>
        /* add generated code to html variable */
        html = html + linkTAG;
        /* [NEW] check if this link is NOT already in allTags */

        //if(allTags.indexOf(linkHTML) == -1){
        if(!allTags[tag]){
          /* [NEW] add generated code to allTags array */
          //allTags.push(linkHTML);
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */

      articleTagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */
    //tagList.innerHTML = allTags.join(' ');
    console.log(allTags);

    // eslint-disable-next-line no-undef
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);


    /* [NEW] create variable for all links HTML code */

    let allTagsHTML = '';
    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
      //const linkTAG = '<li><a href ="#tag-' + tag + '">' + tag + '</a></li>';
      //allTagsHTML += tag + ' (' + allTags[tag] + ') ';
      //allTagsHTML += '<li><a href ="#tag-' + tag + '"> '+ tag +' ('+ calculateTagClass(allTags[tag], tagsParams) +') </a></li>';
      //const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      const tagLinkHTML = '<li><a href ="#tag-' + tag + '" > '+ tag +' ('+ calculateTagClass(allTags[tag], tagsParams) +') </a></li>';

      console.log('tagLinkHTML:', tagLinkHTML);

      allTagsHTML += tagLinkHTML;

    /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;

  }

  generateTags();



  /* 2.1) tagClickHandler */

  // eslint-disable-next-line no-inner-declarations
  function tagClickHandler(event){
  /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href', href);
    //const articleSelector = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */

    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for(let activeTag of activeTagLinks){
      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-' + href + '"]');
    console.log('tagLinks B', tagLinks);
    //'a[href="' + href + '"]'
    //'a.active[href^="#tag-"]'

    /* START LOOP: for each found tag link */
    for( let tagLink of tagLinks){
    /* add class active */
      tagLink.classList.add('active');
      console.log('tagLink', tagLink);
    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }


  /* 2.2) addClickListenersToTags */

  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToTags(){
    /* find all links to tags */
    //const tagsLinks = document.querySelectorAll(optArticleTagsSelector);
    const tagsLinks = document.querySelectorAll('.post-tags a');
    console.log('tagsLinksP:', tagsLinks);
    /* START LOOP: for each link */
    for( let linkTag of tagsLinks){
    /* add tagClickHandler as event listener for that link */
      linkTag.addEventListener('click', tagClickHandler);
      console.log('linkTag' , linkTag);

      //const links = document.querySelectorAll('.titles a');
      //for(let link of links){
      //link.addEventListener('click', titleClickHandler);
    }

    /* END LOOP: for each link */
  }
  addClickListenersToTags();



  /* generateAuthors M7.2 ///////////////////////////////////////////////////////////////////////*/
  /* 1) generateAuthors */

  // eslint-disable-next-line no-inner-declarations
  function generateAuthors(){

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find author wrapper */
      const articleAuthorWrapper = article.querySelector(optArticleAuthorSelector);
      //console.log('articleAuthorWrapper', articleAuthorWrapper);

      /* make html variable with empty string */

      let html = '';

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log('articleAuthor', articleAuthor);

      /* split tags into array */
      //const articleTagsArray = articleTags.split(' ');
      //console.log('articleTagsArray', articleTagsArray);

      /* START LOOP: for each tag */
      //for(let tag of articleTagsArray){
      /* generate HTML of the link - Author */

      //const linkTAG = '<li><a href="#tag-">' + tag + '</a></li>';
      const linkAuthor = '<li><a href ="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';
      console.log('linkAuthor', linkAuthor);

      //<li><a href="#tag-cat">cat</a></li>
      //const authorsList = document.querySelectorAll(optArticleAuthorSelector);
      //authorsList.insertAdjacentHTML('beforeend', '.list authors');

      /* add generated code to html variable */
      html = html + linkAuthor;

      /* END LOOP: for author */

      /* insert HTML of all the links into the author wrapper */

      //const articleAuthorWrapper = article.querySelector(optArticleAuthorSelector);
      articleAuthorWrapper.innerHTML = html;
    }

  }
  generateAuthors();

  /* 3.1) authorClickHandler */

  // eslint-disable-next-line no-inner-declarations
  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href-author', href);
    //const articleSelector = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all author links with class active */

    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active author link */
    for(let activeAuthor of activeAuthorLinks){
      /* remove class active */
      activeAuthor.classList.remove('active');
      /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a.active[href^="#author-' + href + '"]');
    console.log('authorLinks B', authorLinks);
    //'a[href="' + href + '"]'
    //'a.active[href^="#tag-"]'

    /* START LOOP: for each found author link */
    for( let authorLink of authorLinks){
      /* add class active */
      authorLink.classList.add('active');
      console.log('authorLink', authorLink);
      /* END LOOP: for each found author link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  }

  /* 3.2) addClickListenersToAuthors */

  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToAuthors(){
    /* find all links to autors */
    //const tagsLinks = document.querySelectorAll(optArticleTagsSelector);
    const authorsLinks = document.querySelectorAll('.post-author a');
    console.log('authorLinksP:', authorsLinks);
    /* START LOOP: for each link */
    for( let linkAuthor of authorsLinks){
    /* add addClickToAuthors as event listener for that link */
      linkAuthor.addEventListener('click', authorClickHandler);
      console.log('linkAuthor' , linkAuthor);
    }




    /* END LOOP: for each link */
  }
  addClickListenersToAuthors();



  // eslint-disable-next-line no-inner-declarations
  function multiplyNumbers(numA, numB = 2){
    return numA * numB;
  }

  console.log('multiplyNumbers(5, 3) =', multiplyNumbers(5, 3)); // multiplyNumbers(5, 3) = 15
  console.log('multiplyNumbers(5) =', multiplyNumbers(5)); // multiplyNumbers(5) = 10

}
