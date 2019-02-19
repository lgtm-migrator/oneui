# Textkernel OneUI Developer Guide

When contributing to the OneUI library, please consider the following developer guidelines.

## Definition of Done Checklist
Any new implementation is expected to meet the following standards before it can be merged.

- The component has been manually tested and complies with the Textkernel [browser support guidelines](https://textkernel.com/browser-support/).
- The component has a [__displayName__](#display-names) defined.
- The component comes with a [__detailed propTypes__](#component-props) (and defaultProps) definition.
- The implementation complies with [__accessibility__](#accessibility) standards.
- The component is __properly exported__ in `src/index.js` (maintain alphabetical order).
- The implementation is thoroughly [__covered by tests__](#testing) (Jest / Enzyme, preferably 100%), not only with snapshots.
- The component [__comes with a story__](#component-showcases) in Storybook that allows props to be changed with knobs.
- The implementation is __reviewed__ by another contributor.
- The complete __build is passing__ (including tests and code linting).

## Component Design
In general: OneUI tries to adhere to the principles prescribed by [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/). This means we intend to work from the smallest possible units (molecules) towards larger compounds (organisms).

### Functional vs. Class Components
Simple functional components have the preference over class / stateful components. Only use class components if it needs to have lifecycle methods or a state of its own.

### Display Names
Every component should have a [display name](https://reactjs.org/docs/react-component.html#displayname) defined. This is because component names will get minified in the production build process, causing them to be mangled and unidentifiable.
For consistency, file name, component name and displayName should be the same.

### Component Props

#### Prop Types
Every component should come with a detailed [prop types](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes) definition. Go for the highest level of specificity that makes sense. For example, don't just use `PropTypes.object` when you can use `PropTypes.shape`.

#### Required / Default Props
Make sure to consider which props are required. Those that are not required should come with a default value in the component `defaultProps` definition.

#### Use of Props and `...rest`
Props that are very specific to a component should be explicitly destructed and applied accordingly. Any remaining props should be applied to the top-level DOM element using `...rest` syntax, before all attributes that should not be overridden. Considering the following example of a component that renders a simple checkbox:

```
const { disabled, ...rest } = props;

return (
    <input {...rest} type=”checkbox” disabled={disabled} />
);
```

Using the `...rest` syntax we allow any (undocumented) prop to be applied to the element, while never overriding required or specific attributes. This makes the component API less opinionated while still enforcing its minimum requirements (e.g. not allowing it to render a text input instead of checkbox).

#### Prop Descriptions
Every prop in propTypes should come with a short description of its purpose. This description will automatically show up in Storybook. Descriptions are to be written in jsdoc format, above each prop type definition. For example:

```
Button.propTypes = {
    /** The type of this button */
    Type: PropTypes.oneOf([‘submit’, ‘button’])
};
```

### Accessibility
We strive for a high level of accessibility for all components that come with OneUI. An overview of best practices specific to React [can be found here](https://reactjs.org/docs/accessibility.html). At least consider the points below.

#### Semantic HTML
Always try to use as much semantic HTML as possible. Do not just use div or span if there is a semantic alternative that makes more sense. Moreover, make sure that proper attributes are used (e.g. `input type=”search”` rather than `input type=”text”`) and elements are properly labeled and referenced when applicable (e.g. `<label htmlFor=”myInput”>Some label</label><input type=”search” id=”myInput” />`).

#### WAI-ARIA Compliance
Try to make components as descriptive as possible to increase accessibility for e.g. screen readers. Especially when using elements that are less semantic (e.g. div), consider application of [WAI-ARIA roles, properties and states](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics) to improve accessibility.

### Forwarding Refs
[Ref forwarding](https://reactjs.org/docs/forwarding-refs.html) is a method to expose the component's DOM node, the rendered output, to a parent component. This may be useful when the outer component needs to know about e.g. size or position of the child, or programmatically set focus on it.

### Component Showcases
Each distinct component should come with an example, for which we use [Storybook](https://textkernel.github.io/oneui/). When creating new component stories, use [addon knobs](https://github.com/storybooks/storybook/tree/master/addons/knobs) to allow users to try out different prop values. Prop descriptions should appear automatically when properly defined in the code.

## Theming Compatibility
OneUI comes with a [BEM-utility](https://github.com/textkernel/oneui/tree/master/src/packages/bem) that auto-generates and applies CSS classes on the basis of the component name and its props that affect styling. Detailed instructions with regard to how to use the utility [can be found here](https://github.com/textkernel/oneui/blob/master/src/packages/bem/README.md). The most important rule is that any CSS property values that should be affected by themes need to be defined as CSS variables. Each CSS variable should come with a default value, defined by the base theme. Any static CSS property values _will not be affected_ when using custom themes.

## Testing
Each implementation should be thoroughly covered with tests. DOM structure can in general be covered using Jest snapshots while additional interactivity / behaviour needs to be explicitly tested through assertions - don’t overdo on snapshot tests. Always strive for 100% code coverage. Component tests are to be put close to the implementation in a `__tests__` folder. Before rounding up your implementation make sure that the complete test suite is passing. In short:

1. Place tests close to implementation, in `__tests__` subdirectory within component directory
2. Start with simple component rendering tests, possibly using a snapshot
3. Test additional interactivity / behaviour with explicit assertions
4. Strive for 100% code coverage