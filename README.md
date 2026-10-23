# Website Rebuild Brief Planner

Decide what to keep, what needs to change and what your next website must do before you commission a rebuild.

**For Manchester business owners. No coding knowledge needed.**

[Open the free tool](https://manchester-web-design.github.io/migration-redirect-checker/) · [See a fictional worked example](https://manchester-web-design.github.io/migration-redirect-checker/examples/customer-output.html)

![Desktop preview](docs/preview.png)

## How to use it

1. Open the tool in your browser. No installation or account is needed.
2. Use your own business details in the labelled fields, or choose **Try a fictional example**.
3. Choose **Create my rebuild brief** and review the result.
4. Adjust your answers, then copy the result, download a text file or choose **Print / Save PDF**.

A rebuild brief and a handover checklist you can send to a designer.

## What to expect

Tell us what is driving the change. You can leave the technical decisions to your website supplier.

This creates a planning brief. It does not inspect your website or change any live settings.

Your answers are processed in the browser tab. They are not uploaded, emailed or saved by the tool. Refreshing or closing the tab clears them. Save your result before leaving. GitHub provides hosting and handles normal request logs. Example details are fictional, not customer results.

## Design and maintenance

The interface uses the colours, typography and visual treatment of [Manchester Web Design](https://manchesterwebdesign.uk/). The tool is maintained by Manchester Web Design, operated by JW Digital Services Ltd. The commercial website is a separate project.

Further reading: [Google guidance on website moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

## For developers

The customer tool uses native HTML controls and small browser modules, with no runtime framework. Its planning or calculation rules are in `src/customer.js`; presentation helpers are in `src/customer-ui.js`.

```sh
npm ci --ignore-scripts
npm test
npm run build
npm run serve
```

Open the local address printed by the server. `npm run build:pages` prepares the static GitHub Pages artifact. Tests cover the customer rules and output escaping.

The original v0.1 developer helpers remain in `src/index.js` for compatibility, with their original examples. They are not needed to use the customer tool. The existing repository name and Pages URL are retained so earlier links keep working.

## Licence and feedback

MIT for tool code. Bundled typefaces retain their original licence notices in `demo/assets/font-licences`. [Ideas and feedback](https://github.com/Manchester-Web-Design/migration-redirect-checker/discussions/1).
