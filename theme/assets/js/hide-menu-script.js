'use strict';

const leftSectionCollapsedSize = 'col-md-1';
const leftSectionNonCollapsedSize = 'col-md-3';

const middleSectionMdMaxSize = 'col-md-11';
const middleSectionMdMinSize = 'col-md-9';
const middleSectionLgMaxSize = 'col-lg-8';
const middleSectionLgMinSize = 'col-lg-6';
const middleSectionXlMaxSize = 'col-xl-9';
const middleSectionXlMinSize = 'col-xl-7';

const HIDE_MENU_CLASS = 'hide-menu';
const COLLAPSE_CLASS = 'collapse';
const NON_COLLAPSE_CLASS = 'non-collapse';

function hideLeftSection() {
    leftSection.classList.replace(
        leftSectionNonCollapsedSize,
        leftSectionCollapsedSize
    );
    middleSection.classList.replace(
        middleSectionXlMinSize,
        middleSectionXlMaxSize
    );
    middleSection.classList.replace(
        middleSectionLgMinSize,
        middleSectionLgMaxSize
    );
    middleSection.classList.replace(
        middleSectionMdMinSize,
        middleSectionMdMaxSize
    );
    leftSectionCardContent.classList.replace(
        NON_COLLAPSE_CLASS,
        COLLAPSE_CLASS
    );
    leftSection.classList.add(HIDE_MENU_CLASS);
}

function showLeftSection() {
    leftSection.classList.replace(
        leftSectionCollapsedSize,
        leftSectionNonCollapsedSize
    );
    leftSectionCardContent.classList.replace(
        COLLAPSE_CLASS,
        NON_COLLAPSE_CLASS
    );
    middleSection.classList.replace(
        middleSectionXlMaxSize,
        middleSectionXlMinSize
    );
    middleSection.classList.replace(
        middleSectionLgMaxSize,
        middleSectionLgMinSize
    );
    middleSection.classList.replace(
        middleSectionMdMaxSize,
        middleSectionMdMinSize
    );
    leftSection.classList.remove(HIDE_MENU_CLASS);
}

const collapsedElement = document.getElementById('titleLeftMenu');
collapsedElement.addEventListener('click', function () {
    const isComponentHiden = leftSection.classList.contains(HIDE_MENU_CLASS);
    isComponentHiden ? showLeftSection() : hideLeftSection();
});
