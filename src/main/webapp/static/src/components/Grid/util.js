import React from 'react'
export default class Util {
    static creatElement(elementData) {
        if (elementData instanceof Object || (typeof elementData === 'string')) {
            if (elementData instanceof Object && elementData['input']) {
                return React.createElement('input', elementData)
            } else if (elementData instanceof Object && elementData['type']) {
                return React.createElement(elementData['type'], elementData, elementData.label)
            } else {
                return React.createFactory(elementData)
            }
        } else {
            throw new TypeError('argumnent to the createElement should be of type Object or String.')
        }
    }
    /**Append new child node to parent node */
    static appedChild(node, children) {
        if (React.isValidElement(node) && React.isValidElement(children)) {
            if (!Array.isArray(node['props']['children'])) {
                const tempchild = [node['props']['children']]
                tempchild.push(children)
                return Util.creatElement(node.type)(Object.assign({}, node.props, {
                    key: node.key
                }, {ref: node.ref}), tempchild)
            } else if (Array.isArray(node['props']['children'])) {
                node['props']['children'].push(children)
                return node
            }
        } else {
            throw new TypeError('Not avalid React Node')
        }
    }
}