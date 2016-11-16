import lego, { PropTypes } from './../src/lego.js';

describe('Lego must works as expected', () => {
  var factoryFactory = lego({
    a: PropTypes.object,
    b: PropTypes.array,
    c: PropTypes.number
  }, function(a, b, c) {
    return a.hello +  b[0] + c;
  });
  it('Lego must returns a factory', () => {
    expect(typeof factoryFactory).toBe('function');
    let subFactoryFactory = factoryFactory({
      a: {hello: 1}
    });
    expect(typeof subFactoryFactory).toBe('function');

    let subSubFactoryFactory = subFactoryFactory({
      b: [1, 2, 3]
    });
    expect(typeof subSubFactoryFactory).toBe('function');
    let subSubSubFactoryFactory = subSubFactoryFactory({
      c: 15
    });
    expect(typeof subSubSubFactoryFactory).toBe('function');

    let result = subSubSubFactoryFactory();
    expect(typeof result).toBe("number");
    expect(result).toBe(17);
  });


  it('Lego must provide errors on wrong types', () => {
    var factoryFactory = lego({
      a: PropTypes.object,
      b: PropTypes.array,
      c: PropTypes.number,
      d: PropTypes.string,
      e: PropTypes.boolean,
      f: PropTypes.function,
      g: PropTypes.Date,
      h: PropTypes.instanceOf(Array),
      i: PropTypes.oneOf('a','b'),
      j: PropTypes.oneOfTypes([
        PropTypes.string,
        PropTypes.number
      ])
    }, () => {});

    function wrongObject() { factoryFactory({a: 'Wrong'}); }
    function wrongArray() { factoryFactory({b: 'Wrong' }); }
    function wrongNumber() { factoryFactory({c: 'Wrong' }); }
    function wrongString() { factoryFactory({d: ['Wrong']}); }
    function wrongBoolean() { factoryFactory({e: 'Wrong'}); }
    function wrongFunction() { factoryFactory({f: 'Wrong'}); }
    function wrongDate() { factoryFactory({g: 12345}); }
    function wrongInstance() { factoryFactory({h: {}}); }
    function wrongOneOf() { factoryFactory({i: 'c'}); }
    function wrongOnOfType() { factoryFactory({j: []}); }

    expect(wrongObject).toThrow();
    expect(wrongArray).toThrow();
    expect(wrongNumber).toThrow();
    expect(wrongString).toThrow();
    expect(wrongBoolean).toThrow();
    expect(wrongFunction).toThrow();
    expect(wrongDate).toThrow();
    expect(wrongInstance).toThrow();
    expect(wrongOneOf).toThrow();
    expect(wrongOnOfType).toThrow();

    function validObject() { factoryFactory({a: {}}); }
    function validArray() { factoryFactory({b: [] }); }
    function validNumber() { factoryFactory({c: 123 }); }
    function validString() { factoryFactory({d: 'Ok'}); }
    function validBoolean() { factoryFactory({e: false}); }
    function validFunction() { factoryFactory({f: () => {}}); }
    function validDate() { factoryFactory({g: new Date()}); }
    function validInstance() { factoryFactory({h: []}); }
    function validOneOf() { factoryFactory({i: 'a'}); }
    function validOnOfType() { factoryFactory({j: 123}); }

    expect(validObject).not.toThrow();
    expect(validArray).not.toThrow();
    expect(validNumber).not.toThrow();
    expect(validString).not.toThrow();
    expect(validBoolean).not.toThrow();
    expect(validFunction).not.toThrow();
    expect(validDate).not.toThrow();
    expect(validInstance).not.toThrow();
    expect(validOneOf).not.toThrow();
    expect(validOnOfType).not.toThrow();
  });

  it('Lego must provide errors on not filled', () => {
    var subFactoryFactory = factoryFactory({
      a: {},
      b: []
    });
    expect(subFactoryFactory).toThrowError("Lego factory requires props: c");
  });
});
