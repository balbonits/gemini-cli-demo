const createSVGMatrix = jest.fn(() => ({
    a: 1, b: 0, c: 0, d: 1, e: 0, f: 0,
    multiply: jest.fn(() => createSVGMatrix()),
    inverse: jest.fn(() => createSVGMatrix()),
    translate: jest.fn(() => createSVGMatrix()),
    scaleNonUniform: jest.fn(() => createSVGMatrix()),
    rotate: jest.fn(() => createSVGMatrix()),
}));

const createSVGPoint = jest.fn(() => ({
    x: 0, y: 0,
    matrixTransform: jest.fn(() => createSVGPoint()),
}));

const originalCreateElementNS = document.createElementNS;

global.Chart = jest.fn(() => ({
    destroy: jest.fn(),
}));

document.createElementNS = jest.fn((namespaceURI, qualifiedName) => {
    if (namespaceURI === 'http://www.w3.org/2000/svg' && qualifiedName === 'svg') {
        return {
            createSVGMatrix: createSVGMatrix,
            createSVGPoint: createSVGPoint,
        };
    }
    return originalCreateElementNS.call(document, namespaceURI, qualifiedName);
});

HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    clearRect: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    fillRect: jest.fn(),
    fillText: jest.fn(),
    arc: jest.fn(),
    ellipse: jest.fn(),
    setTransform: jest.fn(),
    transformedPoint: jest.fn(() => ({ x: 0, y: 0 })),
}));