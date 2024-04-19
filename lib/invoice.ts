// import HTMLToPDF from 'convert-html-to-pdf';
// import pdf from 'html-pdf';
import puppeteer from 'puppeteer';

export interface InvoiceOptions {
    seller: {
        logo: string;
        name: string;
        address1: string;
        address2: string;
        nip: string;
        regon: string;
    },
    customer: {
        name: string;
        email: string;
        VAT: string;
    },
    orderId: string;
    date: string;
    paymentTerms: string;
    balanceDue: string;
    items: { name: string; qty: number; rate: string; amount: string }[];
    total: string;
    notes: string;
    terms: string;
}

function getDeliveryItemsHTML(items: InvoiceOptions['items']) {
    let data = '';
    for (let item of items) {
        data += `
    <div class="table-row">
        <div class=" table-cell w-6/12 text-left font-bold py-1 px-4">${item.name}</div>
        <div class=" table-cell w-[10%] text-center">${item.qty}</div>
        <div class=" table-cell w-2/12 text-center">${item.rate}</div>
        <div class=" table-cell w-2/12 text-center">€${item.amount}</div>
    </div>
    `;
    }
    return data;
}

function getDeliveryHTML(options: InvoiceOptions) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        /*! tailwindcss v3.0.12 | MIT License | https://tailwindcss.com*/*,:after,:before{box-sizing:border-box;border:0 solid #e5e7eb}:after,:before{--tw-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:initial}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:initial;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:initial}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input:-ms-input-placeholder,textarea:-ms-input-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.flex{display:flex}.table{display:table}.table-cell{display:table-cell}.table-header-group{display:table-header-group}.table-row-group{display:table-row-group}.table-row{display:table-row}.hidden{display:none}.w-60{width:15rem}.w-40{width:10rem}.w-full{width:100%}.w-\[12rem\]{width:12rem}.w-9\/12{width:75%}.w-3\/12{width:25%}.w-6\/12{width:50%}.w-2\/12{width:16.666667%}.w-\[10\%\]{width:10%}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.justify-center{justify-content:center}.rounded-l-lg{border-top-left-radius:.5rem;border-bottom-left-radius:.5rem}.rounded-r-lg{border-top-right-radius:.5rem;border-bottom-right-radius:.5rem}.border-x-\[1px\]{border-left-width:1px;border-right-width:1px}.bg-gray-700{--tw-bg-opacity:1;background-color:rgb(55 65 81/var(--tw-bg-opacity))}.p-10{padding:2.5rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.px-4{padding-left:1rem;padding-right:1rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.pl-4{padding-left:1rem}.pb-20{padding-bottom:5rem}.pb-16{padding-bottom:4rem}.pb-1{padding-bottom:.25rem}.pb-2{padding-bottom:.5rem}.pt-20{padding-top:5rem}.pr-10{padding-right:2.5rem}.pl-24{padding-left:6rem}.pb-6{padding-bottom:1.5rem}.pl-10{padding-left:2.5rem}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.text-4xl{font-size:2.25rem;line-height:2.5rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.font-bold{font-weight:700}.font-normal{font-weight:400}.text-gray-500{--tw-text-opacity:1;color:rgb(107 114 128/var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.text-gray-400{--tw-text-opacity:1;color:rgb(156 163 175/var(--tw-text-opacity))}.text-black{--tw-text-opacity:1;color:rgb(0 0 0/var(--tw-text-opacity))}
    </style>
</head>
<body>
    <div class="p-10">
        <!--Logo and Other info-->
        <div class="flex items-start justify-center">
            <div class="flex-1">
                <div class="w-60 pb-6">
                    <img class="w-40" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK8AAABLCAYAAAAGR9fhAAAgAElEQVR4Ae1dCVhb15VO02mn6TpNmqZtmnYm+2S6pdNM1s60M00aZzGb2IVAK1oQQhKbWCXLQkIsZhNGXhBgsDGLg02Ml4CJMbZjGxs7NtjxhsE7MTYGG8dL/Ob733D1PRQZBAgbT8T3ifvefXc599z/nnveuefe98AD9+jv1KlTz+r1+mfS09Pf0Gq1rMjISFZQUBDL19eX5e/vzxIIBKz4+HhWcXHxnJSUlGcoinrsHpHqqfbrzAGKoh7Mzc19aP/+/X8xm80N0dHRlI+PDzV37lzKz8+P/rFYLDr09/enn3l7e1OI8/LyonD9/vvvUzKZjCosLNy2e/fu5AceeOCbFEX9w9eZr562zzAHrFbrgoiIiNOBgYE3AEZfX1/6R0DrSkiAjbQkv7+//wiHwzlfUlJineEmeIr/OnFg1apVbyiVykaBQEBLTgAOAGSC0BXQupIGUpnD4VDh4eHLNm/enP514rOnrW7kQHZ29gsWi4V69913nQIVKoErgHQlDZHAUD8wKBC+9957lMFguGGxWF6iKOobpGlQW8i1J/Rw4CscKC4uHvH29r4NSegK+GYqDYA8d+7c26mpqZ9/hUhPhIcDTA4UFxensNns68yXL3cBc7JqBqQx6kY+DKKIiAhq0aJFC5n0eq49HHjgxIkTP5fL5dWYrqcCVua0z2azP1coFAfZbHYln89fo1aru2QyWRePx+sKDQ3t8vHx6eLz+VRgYKDd+kDUhYkAjkEVFxfXce7cuZ96uu1rzgHoj0NDQ89yudzB6aoIAKNWq/2AoqjvjMdWiqK+S55v2bIlISYmRqbRaAZZLNYQi8UaAYDHAzGehYSEfCmXy39IUdRDpCxP+DXiAEVR366vr3+JzWZP2tzlKJ3x8mYymajpsA+gByDnzJnzqMViOQS6MKCY6gOpFwD29/e/UVVVFeoB8HS4fh/mpSjqh6WlpSxIy6mqCgRIJLRarVHuZAVFUd/T6XTvxsTEfBgcHDxGnQGgQXtISAiVmpoqdme9nrJmOQdqa2u5ziQaAeJEIXNaB/jDw8MpHo/33Ew1+6OPPvqRRCI5yqQZ16gbIM7OzvZI4Jli/mwqd9euXS+iw/GbCKR3eg7gBAQE0Pl1Ol0JRVH/dDfaWFtbK4UUhjoRFBREg5cMpK1bt3rdDRo8ddwDDgwNDT138uTJ32EFC6AknX4ngI4XDx+FzMzMtS0tLY/f7aZYLJYnwsPDLzu+YGIwWq3WP95tejz13QUOwPFFKpUOkql3PHA6e4aXMhaLdZvNZn/xwQcfaO4CyXeq4hu5ubkPYxAy2wIVQiQSfUlR1I+Hh4d/6lmJuxP77sN4lUq1fDpLupB0AMyZM2d+cq+bj4HY2dnpxZw9AGR/f//b0dHRXfeaPk/9buRAfX29himlnEnW8eKQF5Jt9erVz8HE5kbSplQURVHfQsbk5OQ9oMuxbcuWLYucUsGeTLOPAxEREUPjgXO8Z5DWeEmqqKj4+2xrGUVRPwkMDLzmqP/ChCaVSr8/2+j10DNJDhiNxprp+CpAsimVyg8nWe1dS56UlFTDVB+IapSdnb3trhHhqcj9HKirq3vey8vr9niSdaJnbDb7jPspc1+JKpXqRQwwx3bAlbO9vd3XfTV5SrqrHMjKytqCTnXUCR07+k73kNhLly4V3lWip1AZPM4c24A2R0ZGNk6hOE+We82BY8eOPevYoZO5x1SclpZ2/F63w5X6U1JSutE2R/UBCymHDx/+T1fK8KSZJRygKOoHarV6oZ+f35RVBqxgSaXSn82SJo1LRk5OziKAl+i7uB6dbW5rNJoj42b2PJx9HOByuf2TkbSOaX19fb9obW29K8u+0+WeRCJ5zpF+ch8aGjqi1Wr/gZjXpluXJ/8Mc6CysvK9qeq5pNMDAwMvzzCZbiuex+M9SXwtCP0kBB9sNpvnxc1t3J7hgpKTk8/4+PjcngqAoTfCd8FkMt0X+i5YqVQqn4RvA1PnZYJ3/vz50/I1nuHu8hRPOFBQUPCPvr6+g+i8yYKX6Ixyufy+6myAF8B1Bl7wAYNx8+bN/0J45AlnKQdeffXVhzCF3qkjiURyFgK8MI9t3rz5vppmoTbcqb0YwHiWmJj4l1naZR6yCAdKSkrkk5W4BMjIB/Bu3LhRRcq7H8L6+vqIidpsNps9O49ne2dqtdrDE3UkAeudQrFYXDHb28mkz2KxlEC6jtduiUTyMTOP53qWceDo0aNP83i8r6w23QmkjvFQN6RS6X2l76ILuFxusWNbmPcA9UTtYu5qnky3Xrx48UfO0pONoRRF/aOz567GkXLGS088/a5duzauXj9dWsajYdrP9Hr9U/CwupP+x+xQZ9c4YqmoqOg9iqIenjYxd7GA2NjYCQcsAExR1G/HI2toaOgnt27d8r5+/brf+fPn/QYHB/2Gh4f9hoaG3hgYGHgN8QMDA/7nz59/EuV0dna+OzIy4tvf3/8OgHHx4sV3h4eH/SmKsoPowoULLyHf9evXn4eD/ODgYCDKvH79esBEYNqxY0f4neiFT/PKlSv9du7ciXK+hd+lS5fmDg8P+166dMmHmQ/gXrdunW9XV9fs7Vez2fyWMycVZ0BlxqFj8bKWkZFRwmz0/XANiTmeuoB2YjBDl//ggw/eGq9Nn3766W+FQiEGwgUul1slEAhWhoWFUTqd7pMFCxa8CquFTCYbqqio+B5FUd9cvnx5CY5r1Wq1K1BuRkZGy9tvv01pNBo7H7Ozs5eP1h2FHdEKhWIbBIxAIGgUi8U7VCoVhRVC5GeeyXbmzJk/v/XWW1RZWdlyR5rj4uL0CQkJVHx8fLVAIDitUCjo2TIrKysLZSuVyjXMPIsWLfo30GUymTjM+Fl1rdFocKDzhFKICVxco8FCofDgrGqMi8Skpqa+DFA5tol5T/RhmUz25kTFlpaWXg4ICLC7gG7atCkgLS1tM/KFhYXdXLp0aS2zDJyeOTAwwELc8ePHOVwul96carVaaXUiJyfn2cDAwC/ICp9MJnsZfbRv375fIg92RgcGBl43GAzFpFwMSIlEos/LyxuOjIy0q3EAd1NTUzJUQ5IW4bx58+z3GGw1NTVjJG9ubm69QqFYHx0d/REz36y65nK5LGanuXqN45euXr16321eRGeKxeLoiWYbInnLy8sLJ+qwJUuWjAEv0jc1NdF6K5vNvrlo0aIx4AXvCHh7e3s5QqFwZ2xs7JHExMQryKvVap/28vK6SupVKBQvQ1gQ8EKnzcnJ2SAWi+0ARNq0tLSR7u7u36BtJpPpV4iDtOfxeGdjY2NLSXkIz549+87IyMgTuMZhLfX19Xbw4owODodz88yZM4kANjPfrLrGUfoTdaQjoNGxPB7vvrIuMJmuVCo/Rhsc2+V4D+lssViWMvM6uwZ4lUrl4YsXL75RWVmZnJmZaZ+27yR5BwcHack7Ct5PsSDy3nvv3V68eHHwpk2b/Hx8fO4IXtCwevXqKLSB0NPR0fF8ZGRkG+79/PyuGY1GEa5tNtt3vL29L6vVajlJ6xg6gjctLY0vl8vXIV1QUNB1m80mdcwzK+7xDQjHTpvoHmA3m83+s6IBUyBCIpFMCFzwAOAtKipyCbwBAQEXZTJZR1BQ0BGTyWTP4wp4uVzufjTDYDB8wufzr2zZsuXZicDb3NysYIJXrVYfLSsr0+PbHRaLpS8jI2MIZUZERHzHx8fnskajibkTqxzBy+fzNx09epRDUdTPRSLRzsjIyIY75b2n8ZC8rkghAmiSlqKop+8p4VOsfPXq1aEAJWkHaZezcJLgpXVeq9X63bq6OiUhD9Pv4sWLv6I29Pf32yUvj8ejwYs8YWFhQyaTaY+j2gCBQdQGpNPr9QqRSERLXn9//28GBAT04x76NHRe7MmjKOr7kLx+fn6XJRLJuOAlOi9FUb/EaUYoA2Xhms/nD5L2zKpQKpVO6oUNLw5arbZ9VjViEsRIJJINrr6gTgW8jqRAyufl5dGWBfIMOi+5htrABG9WVlb0qL+IHTDQeZnghe91ZGRkb1xcHC0R165dy01JSWklZSIMDQ3FrCGDjh8ZGXlOJBKNsSZUVVXZ1T5IXgLe5OTkTJFIVETKoijqNxjYFEX9msTNmnCy1gYcIpKQkPArpolm1jRmAkJAc2ho6EWAwxUAuwre3NzcQaFQeNjZoSUlJSU6gUBws6enh3bSr6qq2i4Wi7cSUru6urg8Hu84WTSgKOpHqampA/7+/nbwwpyJF7Zjx469W1BQ8MK8efNqeTzela1bt76KcmACa2hooF/IYFpDHIfD6ZNKpdtxvXXr1gRYGxITE/8d9zabzZ/pSIWXMth/KYp6NDAw8FJBQUECs38h0WNjY2uQd1b9lZaWesHu6GzadIzDVPv+++9/WV9fP2YUDg8PP9rR0ZE4qxrmhBiYokalmkvtdQW8xcXFT8rl8pMymaxXp9OVOVbb29v7ZnV19frw8HDYgQeTkpLWfP755zSItFrtg7GxsV3R0dH9eXl5bOQFaJYvX/5GVFQUDeiRkZHX1Gr1sEql6hWJROc0Gs1AeXl5Hqln6dKlFWq1uk8ul1+qq6t7GZaIqqqqmujo6DMxMTHnVq5cKUNaOE5JpdILISEhg7A+FBcX7yCqHyRvU1PTHJvNNiSXy/tSU1NvkPLz8/M3R0VF9cbExJyaP3/+XT+qi9DhNDSbzc+4IoUIkCEBuFzuF2VlZVk1NTUKvV5fHRQUdAUbGp1WMIsijUbjNdIOV0JXwEua50zq4tnJkycfgrmKpHMWQjcFaJnSznHpeWBg4BWSl3x/jpi6SDxC8mz0+sELFy68TJ739/e/CIsI7MdXr179OYmHnZlcX7p06cUzZ87QZjbm0jHa0NPTM+4h4KSMuxZeuXLlZ1DOJwNgpAWI0blMMxtFUf961wifZEX19fU/n4zUBbgnA95JkjMrklsslp+lpqZiRQ4fZbw//8xm8+nJgNeZ1EL+pKQk22zlQGlpqR4DzhUrA2nf/3fwkr5yJsHJs1kfNjQ0mJyBF5IKnQ3pimumlCUdTEKkmzt37q3u7m77m+psanhkZGQPPOCctZO0wTH8uoB3NvXTpGmJjY39HuyCjp1H7gFMSK3xtsUDFEiHNXmxWLzowoULz0+akBnKsGDBAhbon+zh2B7wzlCHuLPYmpqabwcHB18kYCUSF+6Oo4bvfJxhi7V0ABTpEBLAIoQXFHTnmJiY6ra2Nj930jfdsiQSySnQPBmpi/STBS9ehG7cuPGn6dA73ssdeaGjKOqRieoYGBjAl4+wff8JrJSNl368Opn5YEo7duyY3RcZPhDM5+NdUxT1B7yYjpdmys8SEhI+hVqAqTUgIOB6cHDwsYaGhjGG7dTUVCsBAdICDEgfHBzcv3jxYiMqh10zPT392GQaNmWiJ8h47dq1X2s0mk2js8YdZxa0ydlvsuBVq9UCnHe2du3aMQev4Cv3WJiorq6uZpKMsyGioqJoAaFSqW7HxMTchgN8VFTUWaQzGo17YZ+FmQr3hw4dEkOAwLJjs9kM8PtNT09vFQqFcAwaxDPm4AHYExMTK+Pi4rDIYP+EV0lJiRfSikSi24cOHfoByl63bt3/wLUT9t/h4eEXGhoairDChkUW0CWXy28WFBTUI+3AwMALCBUKxVGkUSgUX0ql0i9VKtVlnU735uDgoN03GenwB2E3b968lNFb9wbd3d1/hPTk8/lHtFrtd8goJ7XAFNTU1BRPJC461mg0HoiJifkniqKe12g0ld7e3jcgtSGxGxsb80neexHCBBgREXGL0OsMnBPFTRa8+fn59NGuIpHoKWab8/Pzm1ks1gFmHLnOy8vbHRwc3IF7LFRs2rTpOQ6HY//0LIC6bt062gaMNGq1mlqxYsVruBaJRE0ajWYjJCdFUb+CPfazzz4TkLIvX778NPkqktVqHeNUbzabz2JxIjc310DSCwSCbD6f/yLu0f8hISEwia7CfWNj43e1Wu0Q6h99/uPu7u4wCC/cwySXlpaWCvUT98y/pUuXxmCQSqXSfaO0ut/kJhAITrFYrFvYHcCsnFxLpdIn4MQcHR0tuHDhwn/09fX9PTIycjMIZr7MATChoaE3HAcAKeduhHq9ftFk1QRHME8GvHv27Pk9m83eLpFI1uTk5IxZPi8oKGgOCAiw+y8w219QUADw7mLGlZWV2cEPgLW3t9N+CXCd1Ol09KID0gsEgs/i4+M348xh3Le2tv6SzHjgvUQi8U5LS6tksVjnUlNTY5l1REdHt7W1ta3Ge0BNTQ0NbA6HY2Kz2b8n6cLCwq5VVFR8QO4RYjAVFBTQEvTgwYMhyE+e9/f3v40FL6hPZMcHhB5Uz6amJgOWrElat4cJCQkF6HClUtnkrHDiHJ2UlPRmamrqKUhqSFrHTgd4w8PDoXLYv7zurLyZjONyuVeZA8qRRlfuJwNepVLZlpubK16zZk0EpnrmYsFE4OVwOAcGBgaeWL169Z9MJhO9pEt4A/C2tLSkazSaBTk5OVUkHmFaWpoWgEhISEjBNzWYz3Ct0+nOwidBr9evi4qKGjN45HL5tu7ubll4ePhxhULRgvTOwFtWVmYHL3TWoKCgnVFRUfQ5xo7gzc/Pl8ORh0mHWCx+HN81QRz4smrVqgmd+5n5Xb6mKOpldCo6vaamZswH/k6dOvVsXV1dFAiYCBRqtfqeet8vWbIkEzTeTclLptMTJ078EYN3xYoVYYTxzsBLNmEuXLhwN4vF+lKhUFzDh2fUavWYI1ax+hUTE3MDbSkqKhqjM+Izujk5OYF+fn43AeLS0tK/kTopinoyPDy8D/d9fX08DAJcX7169RcIsbVo586dEoqi/h30VlRU+Eskkq9IXiZ4kY/L5e4lfsMAL/ASHx+vNZvNbZiVa2pqHkU68ldSUlLT2NhI061QKNbq9fqL5Jnbw6VLlzbjBcfHx+eWxWJZBWlbV1eXx2azr6GR+I0ntQAajUYzZopyO5HjFAi9kcPhHAKdzmaF8Wh3fOaq5F27dm0kVCehUHicw+H0ent7f5mUlGQhZDoDL3kG8AYEBOwk9zabTUuuEWKabmhoCNy4cWMJ+mXjxo2vk+ej+uMvt2zZ8mODwfABeA/rAp6npKSUBQUF3QoLC+vjcDhHwQs4YZG8o+Clnczj4uLWhIWFnYuNjU13VBscwRsYGNiRmJhIOxYBvDgZdMmSJQ8vXLjQDyrE9u3b7Wczw/sNwi48PLyHz+ef4HA4VwICAoZPnDjxlRc6Qte0wvLy8kfQUCjiUAsAAhISaTaRRJNKpVvGI2ImdeEVK1b8idhzJxpojmB1vHcFvBgsYrH4cFlZWfSVK1f+h6KoPyYnJ1fyeDz7MalFRUVjdN7jx4//3mg0HgaPLBbL7pCQkDE6r9lstktYTMONjY34Wue3Y2Jienk83kH4PUDPraiooM1y0C8hZGDVyM7OFoG/PB5v+NixY8EURT1FUdSL0dHRO5iqAxO8SA/nnNjY2NOhoaH2F7vw8PBrNpuNqTY8BAleW1tLb0To6uqy67xffPHFUyKRqAOLQaTvLRZLhEAguEBR1H9QFPVSZ2dnCHg6Z84cmPHcr1JCV7NYLIWOHTmZe4A9JycHUpueQvCB64yMjBeys7Oxt8oLbn+kge4MQXtMTMyEao2rbXEFvBs3bnwG6bZv3/7PaAtemHbt2sXDACd2zfz8/I0sFutT0tby8vJqX19fWrXKz8/H7osd5NmuXbu8OBzOaXKPT4GtX78+ZLTsH8B6sHDhwlo4jfP5/IG+vj76pCKAFy9G3d3d7+zfv98X5jFSBlSU5OTkLBaLNYC+QLxKpdrd2tpq/wISQI+XrbCwsN+QfMHBwV9UVVXR5rHFixc/BnVBLpfvJc+7u7sDIejI/erVq18Eb9esWQP3yp8KBIL1Op3O7gGHdBiMJpNpjH8zye+2kM1m04Z9VzuamQ4NgpSG5UImk8FmfBOrc6Pxt2Uy2cDIyIjd28ldRMvl8heYdEz3eiLw4qwKpVJJz04Gg2Ej2oEFH5VKNYiZSygU0iYv2EoBOjabfTsgIOA2ZgShULjJarV+C7ZVPAsPD7+NH2YNkUh0DGVlZGTQ306WSqXnIKmgx8pkMlodys/P356cnLwXg0QsFt8CyJcvX16al5f3GKQoeF1SUkKbuVAW7LeIS09Ph43YGzqyTCYb2bBhA+3/izQajQZWIlryfvzxxy2gE7SFhYXdFgqFX5aWlhb29/c/g7T4U6lUZ8Hj0RdD2nPOaDQ2oe2FhYX0Owefz7+JdiL9okWLckAD1B+bzTZzHy9va2vzQkXTnXodVQyUh7jRTjrY2NgYjYZhpNIcmeQ/dCpc9RDCYI6yp0szAf1E4J0kqTOSHBL34MGDtNS/UwUzMkXfqbLZEq/VanOJvks61B0hwEVADIBgtUelUuVUVFSEubL06Yw/ubm5H3p7e9PS3XHATJXm+wG8znjhifs/afi9lJSUL4k0gySeKhBcyYd6MFgwfWVkZCxYt27dOxkZGY9MJDl6enpeHs+xyJW6naXxgPc+HgZXrlx5bP369Q+HhITQdkZnHezOOOhKKA9SGXoRBgt0wonAy+Vyz7lL2jLbcz+DF3vZYJFoaWmR79ix47/vYxhOnXTYEvfs2fNfMJaTjp0JoKBsZrlEtWDutHXWCoPBUEsAT+hzVzgReJmraM5ou9dxRqPxY5FIdBrHR8HmOh16KIpyy4dyLl265FQ/JxtHp0Oj07yQfGvWrJmDN09HkLkLKM7KAYBh5HZK1P8dqZTlLJ+74iYCL+gab1aAd9adaJ/p+IaGhr8nJyfTFhDHuhx3Tjjul3NMfzfuYfqb0XpqampeJdO5uwAyXjnjgffkyZOPYzCBnvHKmM4zV8BrNBqf1uv1FPaC2Wy295kdoNVql5WXl9ODD4sMeFZUVBSt0+lokxV0e5PJhHPC7IdYL1u2bBXMWVqtFi6UdgcdZrlLliyxYCkWNu2MjAy7rfaTTz55Ky0tDaYrqre39w3kwaEjOp3uMuI/+ugj2l7c09PzfGpq6klYZ2APhnsl0hqNRrgtUvPnz6f9K9rb2zVoG/IuWbJEUVBQcALXsNcj/apVq7aBTvxSUlLoHz5Eo9frEwi9XV1dPyssLDwOGzTMilqttolpnjt16tRf09LSzkE9NJlMl+HsRfK6NYQKUVNT83RAQMCAr6/vlD826CqgnIEXBneKon4RFRV1k6gWrpY32XSugBcMViqVw3FxcWM8yTANwiCPwTU0NDTGeTwiIuJwcnLyrvLy8sd37Njhr9ForonF4hNEDWGz2Z1SqZQ27mP3MbMThUJhu8lk2vHZZ589vm/fvufgE5GSktJJ/HWXL1++EnTHx8fbDwjMycmZr9fr96AceHlhlWzlypV/vXjx4utarVYgkUjoFdGOjo6n8J5RVVX1d/Q10vv5+Q01NjauJjRAjdNoNFxyHxISsicvL69vxYoVv2htbX06Pj6+MiAggAbvwYMH3wsODr6t0+n+ip3IdXV1f4Jq6O/vT++Wzs3N/S1MpuvXr5ddvnz54aqqKgMEUllZmX0JnNTjlvDcuXNemA5VKlUPLAOTBcRk0jsDL5gfHR19CKAYZcSM0eAqeOPi4i4nJibajzgFoxMSEuIzMjLaMchxpCqT+Vwu90BCQoJ9Sg8PD5f5+vpewgIH0oWEhGwMDAyEB/kf8vPz6QPzEF9eXu6FBQhS1unTp58TiUTww75dWFhI+wvU1taW1tTU7ITPwebNm+cirdFoFJtMpq39/f3fP3LkCF0GATuer1mzhnYigh83wNvU1ERvs+dwOIX5+fljTpfEbhmTyRREaAgNDd1cVFRk/4RZd3f33yorK+kzjcVi8drIyMgxx+AuW7YsCl+fQn61Wt2TmZlJe6hB/cIvIiLiilQqtZ9VTOpxe1hcXNxC9GCAEmBjvnRNBqjO0qIsovNCKgG4OTk5vTNtsiO0uArehISEr4BXoVD0wmYtl8uvpqSkpDOZz+fzD8CJHHGQcFqtdiQ2NtYuuYOCgjYIBIIFPB7v6sqVK+0rUUlJSW2BgYGdzLKKiop+DT5FRkbSfriNjY1leXl5hoSEhEPEZyIzM1OMgTQyMkLrlZB2BoNhc1tb26NYLiZSFuBFHzY3N7+Uk5OTrlQq6aVhZn2O4GWz2XbwLl68eEFWVpbdcR6rehaLxe6gxCwH17Autbe3pzHjrVZrH3Npm/nM7dft7e3PYQmQqBFoPOn86YZM8ILwzMzMI+4sfyL6pgpeOMNIJJL9AEZZWVkGOYWcMF8ikRwIDg7+MjQ09Bq2DSUnJ9dhYAJEALxEIhlOSUk5cPr06deIfwTyBgUFtYrF4n2kHIStra3/DDoDAwNp8K5ataosOzs7E7tbMMgrKys1ZrNZRPyEYXWw2WyvQN/F8aW1tbXzSHkAL1Sd0NBQLOnTEn5wcJD+HAFJ4whegUCwGapBWFjYCGbDvLw8HUkL9SQjI8PpZwYOHz78N/hS9PT0jAGvQqFQT2RhIuW7JcQUpNVqtWg4AOEuyQigktNcUlNTu0b9Jdwq3ccD8FTBO3/+/MaoqKi++Pj45Tqdrg6dumnTJrvqALWBWAL279//mFqtPqZSqehtQsXFxWjfbi6Xaz9pknQSl8tt5XA4YyQvwAv1LTg4+HdIV1tbW5aTk5OJa4PBYA4JCblltVrjyUsYkb7wRIuNjY3D4DGbzXqkJ5L30KFD/71gwYJLQqFwhNRNQkfwQm2wWCy0L4bVaq1IS0sLJGnhzhkfHx9K7ouKitawWKyuhoaGmrNnz/4FdO/du3cMeKFCOQ52kn9GQxjF5XJ5dUhIyHV3qA8YBFg5mz9/fg+A5K5BMR5gmc+mAt6Ojo5veXl5DTY0NMQuW7bMr7y83CcoKOiCXq+3644OasM3sEXHy8sLBwDSOq+/v/9HfD7f7hNdXV390tatW4OMRuURXgAAAAQgSURBVONqHo9nP0cMnanX6/8VvF6wYAF9WhHAC8mLZzCBBQcH38rJyfksMzOTfimDXtnV1UXXgzRZWVmfsNls2iWTgHfFihUv+/v7PwTeGwyGAiZonIG3oKDArvMeOXLkh1VVVfRZbNhMqtVqaecg1BsVFfUvEEhLly6lHeIhmLKysnKY5WdlZd2QSCRjTrxkPr8r1wsXLixjsVi0RYAJiMleM9UEsgI32TKmmn4q4MWGVJiOmEyWSqUfCYXCLhLnAN4H+Xx+SlBQ0AB5YQsICBgD3tTU1Nrm5uZ5FEU9jtnn0KFD9s2tmZmZ6Xw+/xrZM8YE79mzZ/9tw4YN9AfRc3NzaXPc+vXrdfn5+TS4QQ8GCZvNbsY1AW91dTX9wmaz2V6CdGxtbbW/oE0EXpVK5W80GumX1+jo6EpsJsWAHi3/N9C3Fy5cSB/YZ7Vau7hc7m2yQNHc3PyIr6/vdaPReO+PTsCqjFqtft5sNrfAjgcdB1ICgCSSmYRMqYrn9/oHwAO8BQUF9lPOCfgcQ2z5TkpK+hD6P3RZSCybzfYmdu/Cvstmsy9jR7XJZMrk8/kwNcLN8KZSqTzI5XL7sbN21Af2QbPZ/Dp4EhoaOiASibqFQuHRUd2Qtn+uWLHCAF3SYDB8FhcXdzo5OZk6evQoLelw0EtMTMx5Nps92NjYaD/RMTo6+mJGRgb9Vt/c3GzCAEhPT+8yGAzYS09t2LCB3lcGqwG+JpSZmUkf6Y92+vr63gAv1q9fX1RcXGwGmEUiEe3Ta7Va6S9JQV2MiorqjoyMPIC2iUSiJOTt7e19Mjk5eZDD4VzOz8/vFovFF0c3cNIvjmfOnPkJPocQHh7eX1hY2M3lckcKCwvnk4HoyOd7eo9PO6lUqgSFQvFhaGhoB/xcYdIBM8EUdBJ+uL7XP9AxZ84cTMflEzFNqVRe1uv15dge3tnZ+frhw4f9sJOX5Nu7d+9b27Zte625ufnP+/bt+/P27dtf37Vr1+vY0gPdD+lGRkYeh0Vl9+7dr+zfv/+1tra218lvy5YtONnRPtXjwOfq6mr/xsZGOm9fXx+9mIFT2Q8cOCA7fPhwRHt7u305+MKFC4/v3buX3tKOuq5fv/67yspKn8LCwtdxmAwkH74Tt2HDhjn79u17Zfv27XPPnz+PHRiPwC9i586dr4H+tWvXvtzZ2fnap59++g7K6ezsfIm0Z9OmTa9v3br1Pzs6Ot7Yu3cvPXBOnTpF27dbWlpei4mJeRXb448ePQrb8oOENwi3bNkSHB8f/8qNGzf+wIy/L64HBwfFLS0tgurqakFpaanAarXOip/FYuHv3Lnz7fGYuG3btiVeXl4jMKxjmh4vreeZhwOzhgPYiVtXV5cllUrpFaNZQ5iHEA8HXOXAdD22XK3Hk24sB/4XotLpahKWBSUAAAAASUVORK5CYII=" alt="Logo">
                </div>
                
                <div class="w-60 pl-4 pb-6">
                    <h3 class="font-bold">${options.seller.name}</h3>
                    <p>${options.seller.address1}</p>
                    <p>${options.seller.address2}</p>
                    <p>NIP: <span class="font-bold">${options.seller.nip}</span></p>
                    <p>REGON: <span class="font-bold">${options.seller.regon}</span></p>
                </div>
                
                <div class="pl-4 pb-20">
                    <p class="text-gray-500">Bill To:</p>
                    <h3 class="font-bold">${options.customer.name}</h3>
                    <h3 class="font-medium">${options.customer.email}</h3>
                    <h3 class="font-medium">${options.customer.VAT}</h3>
                </div>
            </div>
            <div class="flex items-end flex-col">
                <div class="pb-16">
                    <h1 class=" font-normal text-4xl pb-1">Delivery Report</h1>
                    <p class="text-right text-gray-500 text-xl"># INV-${
                        options.orderId
                    }</p>
                </div>
                <div class="flex">
                    <div class="flex flex-col items-end">
                        <p class="text-gray-500 py-1">Date:</p>
                        <p class="text-gray-500 py-1">Payment Terms:</p>
                        <p class="font-bold text-xl py-1 pb-2 ">Balance Due:</p>
                    </div>
                    <div class="flex flex-col items-end w-[12rem] text-right">
                        <p class="py-1">${options.date}</p>
                        <p class="py-1 pl-10">${options.paymentTerms}</p>
                        <div class="pb-2 py-1">
                            <p class="font-bold text-xl">€${
                                options.balanceDue
                            }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!--Items List-->
        <div class="table w-full">
            <div class=" table-header-group bg-gray-700 text-white ">
                <div class=" table-row ">
                    <div class=" table-cell w-6/12 text-left py-2 px-4 rounded-l-lg border-x-[1px]">Item</div>
                    <div class=" table-cell w-[10%] text-center border-x-[1px]">Quantity</div>
                    <div class=" table-cell w-2/12 text-center border-x-[1px]">TAX</div>
                    <div class=" table-cell w-2/12 text-center rounded-r-lg border-x-[1px]">Amount</div>
                </div>
            </div>
            <div class="table-row-group">
                ${getDeliveryItemsHTML(options.items)}
            </div>
        </div>
        
        <!--Total Amount-->
        <div class=" pt-20 pr-10 text-right">
            <p class="text-gray-400">Total: <span class="pl-24 text-black">€${
                options.total
            }</span></p>
        </div>
        <!--Notes and Other info-->
        <div class="py-6">
            <p class="text-gray-400 pb-2">Notes:</p>
            <p>${options.notes}</p>
        </div>
        <div class="">
            <p class="text-gray-400 pb-2">Terms:</p>
            <p>${options.terms}</p>
        </div>
    </div>
</body>
</html>
    `;
}

async function createInvoice(options: InvoiceOptions) {
    return new Promise<Buffer>(async (resolve, reject) => {
        try {
            const html = getDeliveryHTML(options);
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: 'domcontentloaded' });
            await page.emulateMediaType('screen');

            const pdf = await page.pdf({
                margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
                printBackground: true,
                format: 'A4',
            });

            await browser.close();

            resolve(pdf);

        } catch (err) {
            console.log("ERRORRRR", err)
            reject(err);
        }
    });
}

export default createInvoice;
