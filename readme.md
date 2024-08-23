
# @jsbox/beyondui

`@jsbox/beyondui` is a CLI tool for creating React components, specifically Buttons and Inputs, with customizable styles. You can generate these components in either JavaScript or TypeScript.

## Features

- **Component Creation**: Easily create React components.
- **Customizable Styles**: Customize background color, font color, and border radius.
- **Support for JavaScript and TypeScript**: Choose between JavaScript or TypeScript for component creation.

## Installation

You can use this CLI tool directly with `npx` or install it globally via NPM.

### Using `npx`

Run the CLI tool directly without installing it globally:

```bash
npx @jsbox/beyondui <componentType> [-js | -ts]
```

### Installing Globally

To install globally:

```bash
npm install -g @jsbox/beyondui
```

Then you can run:

```bash
beyondui <componentType> [-js | -ts]
```

## Commands

### `<componentType>`

Specify the component type to create. Valid options are:

- `Button`
- `Input`

### Options

- `-js`: Create a JavaScript component (default if `-ts` is not specified).
- `-ts`: Create a TypeScript component.

## Examples

Create a Button component in JavaScript:

```bash
npx @jsbox/beyondui Button -js
```

Create an Input component in TypeScript:

```bash
npx @jsbox/beyondui Input -ts
```

Create a Button component in TypeScript:

```bash
npx @jsbox/beyondui Button -ts
```

## File Structure

When you run the CLI tool, the following directory structure is created:

```
src/
  components/
    <componentType>/
      <componentType>.js  (or .ts for TypeScript)
```

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


For any additional information or questions, please open an issue on the [GitHub repository](https://github.com/syedtalaljilani/beyondui).

