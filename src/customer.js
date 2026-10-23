import {clean,lines,selected,requireText,number,pence,pounds,section,report,enumValue,webAddress} from './customer-ui.js';
export const config = {
  "title": "Website Rebuild Brief Planner",
  "short": "Start your rebuild with a clear brief",
  "audience": "For Manchester business owners",
  "summary": "Decide what to keep, what needs to change and what your next website must do before you commission a rebuild.",
  "button": "Create my rebuild brief",
  "filename": "website-rebuild-brief",
  "eyebrow": "A fresh start. Without losing the essentials.",
  "time": "About 5 minutes",
  "outcome": "A rebuild brief and a handover checklist you can send to a designer.",
  "layout": "blueprint",
  "intro": "Tell us what is driving the change. You can leave the technical decisions to your website supplier.",
  "note": "This creates a planning brief. It does not inspect your website or change any live settings.",
  "fields": [
    {
      "id": "business",
      "label": "Business name",
      "help": "",
      "required": true,
      "type": "text",
      "maxLength": 180
    },
    {
      "id": "website",
      "label": "Current website address",
      "help": "Optional, for your brief. It will not be scanned.",
      "required": false,
      "type": "text",
      "maxLength": 180
    },
    {
      "id": "reason",
      "label": "What is the main reason for the rebuild?",
      "options": [
        "Hard to update",
        "Looks out of date",
        "Too few useful enquiries",
        "Difficult to use on mobile",
        "Changing services or brand"
      ],
      "help": "",
      "required": true,
      "type": "select"
    },
    {
      "id": "keep",
      "label": "What needs to keep working?",
      "options": [
        "Contact forms",
        "Online bookings",
        "Online payments",
        "Customer accounts",
        "Blog or news",
        "Downloads"
      ],
      "help": "",
      "type": "checks",
      "wide": true
    },
    {
      "id": "pages",
      "label": "Which pages or information are especially important?",
      "help": "One per line. For example: commercial services, project gallery, opening hours.",
      "required": false,
      "type": "textarea",
      "maxLength": 2500,
      "wide": true
    },
    {
      "id": "access",
      "label": "Can you access the domain and website accounts?",
      "options": [
        [
          "yes",
          "Yes, we control them"
        ],
        [
          "supplier",
          "A supplier holds them"
        ],
        [
          "unsure",
          "I need to check"
        ]
      ],
      "help": "",
      "required": true,
      "type": "select"
    },
    {
      "id": "email",
      "label": "Does your business email use the same domain?",
      "options": [
        [
          "yes",
          "Yes"
        ],
        [
          "no",
          "No"
        ],
        [
          "unsure",
          "Not sure"
        ]
      ],
      "help": "",
      "required": true,
      "type": "select"
    },
    {
      "id": "success",
      "label": "What would make the rebuild worthwhile?",
      "help": "For example: customers can request a survey from their phone.",
      "required": true,
      "type": "textarea",
      "maxLength": 2500,
      "wide": true
    }
  ],
  "example": {
    "business": "Example Manchester Workshop",
    "website": "example.co.uk",
    "reason": "Difficult to use on mobile",
    "keep": [
      "Contact forms",
      "Downloads"
    ],
    "pages": "Commercial services\nProject photographs\nExisting customer help",
    "access": "supplier",
    "email": "yes",
    "success": "A simple mobile enquiry form and clearer project examples."
  },
  "sources": [
    [
      "Google guidance on website moves",
      "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes"
    ]
  ]
};
export function evaluate(v){const name=requireText(v.business,'your business name'),site=webAddress(v.website),reason=requireText(v.reason,'the reason for the rebuild');enumValue(v.access,['yes','supplier','unsure'],'who controls the accounts');enumValue(v.email,['yes','no','unsure'],'whether email uses the domain');return report(name+': website rebuild brief','Use this as a starting brief, then confirm scope and price with your supplier.',[section('Why we are rebuilding',[reason,'A worthwhile result: '+requireText(v.success,'what the rebuild needs to achieve'),site?'Current website: '+site:'Current website address: add before sharing.']),section('Keep working during the change',selected(v.keep).length?selected(v.keep):['Confirm any forms, bookings, payments and downloads used by customers.']),section('Information to preserve',lines(v.pages).length?lines(v.pages):['List the pages customers rely on and ask the supplier to review their current page addresses.']),section('Before work begins',[v.access==='yes'?'Confirm the named owner and recovery details for each account.':'Arrange owner access to the domain, website, hosting and relevant business accounts before starting.',v.email==='no'?'Confirm whether any other services depend on the domain.':'Ask the supplier to preserve business email records and test email after any domain or hosting change.','Agree deliverables, ownership, ongoing costs and what is included in the handover.']),section('Launch checks',['Have the supplier map important old page addresses to appropriate new pages.','Test enquiries, booking links, mobile navigation and downloads before and after launch.','Agree a backup and a route to resolve launch problems.'])]);}
