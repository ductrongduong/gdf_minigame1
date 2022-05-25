var Utinity = {};
Utinity.getWorldPositionOfNode = function (node) {
    return node.getParent().convertToWorldSpace(node.getPosition());
};