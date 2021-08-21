export const print = function (dom: any, options?: any): void {
  const _options = { ...options };
  _options.noPrint = '.no-print';
  const content = getStyle(_options) + getHtml(dom);
  writeIframe(content);
};

function getStyle(options: any) {
  let str = '';
  const styles = document.querySelectorAll('style,link');
  for (let i = 0; i < styles.length; i++) {
    str += styles[i].outerHTML;
  }
  str += '<style>' + (options.noPrint ? options.noPrint : '.no-print') + '{display:none;}</style>';

  return str;
}

function getHtml(dom: any) {
  const inputs = document.querySelectorAll<HTMLInputElement>('input');
  const textareas = document.querySelectorAll<HTMLTextAreaElement>('textarea');
  const selects = document.querySelectorAll<HTMLSelectElement>('select');

  for (let k = 0; k < inputs.length; k++) {
    if (inputs[k].type === 'checkbox' || inputs[k].type === 'radio') {
      if (inputs[k].checked === true) {
        inputs[k].setAttribute('checked', 'checked');
      } else {
        inputs[k].removeAttribute('checked');
      }
    } else if (inputs[k].type === 'text') {
      inputs[k].setAttribute('value', inputs[k].value);
    } else {
      inputs[k].setAttribute('value', inputs[k].value);
    }
  }

  for (let k2 = 0; k2 < textareas.length; k2++) {
    if (textareas[k2].type === 'textarea') {
      textareas[k2].innerHTML = textareas[k2].value;
    }
  }

  for (let k3 = 0; k3 < selects.length; k3++) {
    if (selects[k3].type === 'select-one') {
      const child = selects[k3].children;
      for (const i in child) {
        if (child[i].tagName === 'OPTION') {
          const item = child[i] as HTMLOptionElement;
          if (item.selected === true) {
            item.setAttribute('selected', 'selected');
          } else {
            item.removeAttribute('selected');
          }
        }
      }
    }
  }

  return dom.outerHTML;
}

function writeIframe(content: any) {
  const iframe = document.createElement('iframe');
  const f = document.body.appendChild(iframe);
  iframe.id = 'myIframe';
  iframe.setAttribute('style', 'position:absolute;width:0;height:0;top:-10px;left:-10px;');
  const w = f.contentWindow || f.contentDocument;
  const doc = f.contentDocument || f.contentWindow?.document;
  doc?.open();
  doc?.write(content);
  doc?.close();
  iframe.onload = function () {
    toPrint(w);
    setTimeout(function () {
      document.body.removeChild(iframe);
    }, 100);
  };
}

function toPrint(frameWindow: any) {
  try {
    setTimeout(function () {
      frameWindow.focus();
      try {
        if (!frameWindow.document.execCommand('print', false, null)) {
          frameWindow.print();
        }
      } catch (e) {
        frameWindow.print();
      }
      frameWindow.close();
    }, 10);
  } catch (_err) {}
}
