import {Selector} from "testcafe";

const getElementsByXPath = Selector(xpath => {
    const iterator = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    const items = [];

    let item = iterator.iterateNext();

    while (item) {
        items.push(item);
        item = iterator.iterateNext();
    }

    return items;
});

// Usage: the same as testcafe Selector: const ELEMENT = XpathSelector("//div[...]");
export function XpathSelector (xpath) {
    return Selector(getElementsByXPath(xpath));
}