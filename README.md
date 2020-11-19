<h1>1Password Account Tagger</h1>

*A command line script for updating your 1Password tags easier.*

<h2>What and Why?</h2>

[1Password](https://1password.com/) supports adding tags to your logins and other items which can then be explored as groups. They're really useful for finding similar logins, or for grouping logins by purpose or by what information you have provided to companies.

![A selection of tags in a 1Password login.](https://raw.githubusercontent.com/jesskelsall/1password-account-tagger/master/images/1password.png)

I use tags to keep track of what information I have provided to companies, making it easy to get a list of all accounts I need to update when those details change. As examples I tag my accounts for each phone number, address, email address and bank card I have.

When you have more than a few tags on any one login, it's a pain to manually edit the tags. This script makes it easier to see a list of available tags that you define, which are currently applied, and turn them on/off. Simply copy all of the tags from 1Password, run the script, turn tags on/off, then paste back to 1Password!

<h2>Setup</h2>

Install dependencies with `npm install` or `yarn`.

<h3>Tags</h3>

Tags are each different tag string placed into 1Password. Define all of the tags that you use. Any tags that aren't defined are turned off automatically, but can be manually turned back on before copying the selected tags back to the clipboard.

Edit `src/tags/tags.ts`, defining each tag in the `tags` array.

<h4>Static Tag</h4>

A tag can be defined as an object literal:

```typescript
{
  name: 'Avatar: Jessica Kelsall',
  value: 'avatar-jk-11',
  mandatory: false,
  replaces: [
    (value: string): boolean => value.startsWith('avatar-jk'),
  ],
  section: 'avatars',
}
```

- `name: string`: The tag's name to display when choosing tags.
- `value: string`: The tag's value to be used by 1Password.
- `mandatory: boolean`: Whether the tag is automatically selected if it is not already.
- `replaces?: [(string) => boolean]`: An array of functions that check if a 1Password tag string is an older version of this tag. If it is, it is automatically converted.
- `section?: string`: The value of an associated section, in order to provide tag grouping (detailed in full below).

<h4>Dynamic Tag</h4>

A tag can also be defined as a function that returns a tag object literal:

```typescript
(options: Options): ResolvedTag => {
    const quarter = DateTime.local().toFormat('yyQq')

    return {
      name: `Processed Date (${quarter})`,
      value: `processed-${quarter}`,
      mandatory: options.updateProcessed,
      replaces: [
        (value: string): boolean => value.startsWith('processed'),
      ],
    }
  }
```

As this function is ran each time the script is ran, it is particularly useful when you want a tag that references the current date.

<h3>Sections</h3>

Rather than displaying a list of all tags at once, tags can be grouped into sections, with only one section shown at once. This can be useful for drawing attention to certain similar tags while updating existing 1Password logins.

Grouping is only done when the `--sections` command line argument is true. Tags must have a `section: string` value that matches a section in order to be grouped. All other tags are then displayed in an "Other Tags" section as the last section.

Edit `src/tags/sections.ts`, defining each section in the `sections` array.

```typescript
{
  name: 'Contact Details',
  value: 'contact',
}
```

- `name: string`: The name of the section to display before the list of tags to choose from.
- `value: string`: A unique identifier for the section. Tags with a `section: string` that matches this identifier will be grouped into this section.

<h2>Usage</h2>

Copy all of your 1Password tags to the clipboard, then run the script with `npm start` or `yarn start`.

```
$ yarn start --help

Options:
  --help              Show help                                                                 [boolean]
  --version           Show version number                                                       [boolean]
  --sections          Group tags by sections, only showing one section of tags at a time.       [boolean] [default: false]
  --update-processed  Make the current processed quarter tag mandatory, applying it by default. [boolean] [default: true]
```

Select the tags you wish to turn on/off using the arrow keys and spacebar. Begin typing to filter the available tags.

![A section of tags: one replaced, one selected, one mandatory, one deleted, 4 unselected.](https://raw.githubusercontent.com/jesskelsall/1password-account-tagger/master/images/inquirer.png)

- Tags that are green are mandatory and weren't already present, so they have been turned on.
- Tags that are yellow have been replaced automatically with a newer tag.
- Tags that are red were not part of the list of tags and have been turned off.

Once done, press enter to move onto the next section. Once all sections are complete, the tags that were turned on are written back to the clipboard - simply paste them back into 1Password!
