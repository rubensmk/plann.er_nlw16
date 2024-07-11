# Plann.er NLW 16

Projeto desenvolvido na NLW Journey da Rocketseat, um app planner de viagens feito criado em ReactJS com Vite utilizando:
- Tailwind CSS
- Tailwind Variants
- React Day Picker
- Lucide React

![image](https://github.com/rubensmk/plann.er_nlw16/assets/52255226/43a78f20-e28f-4ef3-b1c3-c99b8d18cd50)
![image](https://github.com/rubensmk/plann.er_nlw16/assets/52255226/e85dfbc4-1157-41da-ad2c-038accc84f05)
![image](https://github.com/rubensmk/plann.er_nlw16/assets/52255226/faacd85a-2b68-4e31-b474-f12abad1932f)
![image](https://github.com/rubensmk/plann.er_nlw16/assets/52255226/3bf0c916-26af-46bd-b74c-92cafe2b0f18)


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
