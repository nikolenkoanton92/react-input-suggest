# React-Input-Suggest

React component for inputing tag. Build for my own projects, but if you have cool or features, all forms of contributian are welcome.

## Usage

### Props

|Name|Type|Default Props|Description|
|---|---|---|---|
|`onAddTag`|`Function`|`undefined`|When the added new tag|
|`onRemoveTag`|`Function`|`undefined`|When the removed tag|
|`addTagKeys`|`Array`|`[13,9,40]`|Array of accepted adding keys|
|`removeTagKeys`|`Array`|`[8, 27]`|Array of accepted removing keys|
|`readOnly`|`Bool`|`false`|it specifies that an input field is read-only|
|`isSuggestList`|`Bool`|`true`|if show suggestion list|
|`suggestions`|`Array`|`[]`|List of suggestion values|
|`suggestionValueName`|`String`|`name`|Name of property value for suggestions|
|`placeholder`|`String`|`'Add new tag'`|field placeholder, for input component when input without value

## Example

To run example locally, clone this repo then run:

`make run-example`

After open `localhost:8000` (or what port you using in `process.env.PORT`) in a browser.


## License

MIT Licensed.
