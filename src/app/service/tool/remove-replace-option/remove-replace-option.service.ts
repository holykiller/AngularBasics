import { Injectable } from '@angular/core';
import { ReplaceStrings } from 'src/app/service/tool/remove-replace-option/interface/replace-strings';
import { RemoveReplaceOptions } from 'src/app/service/tool/remove-replace-option/interface/remove-replace-options';
import { TextToolService } from '../text-tool/text-tool.service';

@Injectable({
  providedIn: 'root',
})
export class RemoveReplaceOptionService extends TextToolService {
  constructor() {
    super();
  }
  //Remove all the text given by the options
  removeAllOptions(
    originalString: string,
    options: RemoveReplaceOptions
  ): string {
    const { removeFromTo, replaceText } = options;
    if (removeFromTo) {
      originalString = this.removeFromToOptions(originalString, removeFromTo);
    }
    if (replaceText) {
      originalString = this.replaceTextOptions(originalString, replaceText);
    }
    return originalString;
  }
  //Replace a list of text that match the original for something else
  replaceTextOptions(
    originalString: string,
    replaceText: ReplaceStrings[]
  ): string {
    let counter = 0;
    for (let i = 0; i < replaceText.length; i++) {
      counter = 0;
      while (originalString.indexOf(replaceText[i].original) != -1) {
        originalString = this.replaceText(
          originalString,
          replaceText[i].original,
          replaceText[i].replaceFor
        );
        counter++;
        if (counter > 50) {
          console.log('Search maxed out');
          break;
        }
      }
    }
    return originalString;
  }
  //Replace the text that is from start to end for some other text
  removeFromToOptions(
    originalString: string,
    removeFromTo: ReplaceStrings[]
  ): string {
    for (let i = 0; i < removeFromTo.length; i++) {
      while (originalString.includes(removeFromTo[i].original)) {
        originalString = this.removeTextFromTo(
          originalString,
          removeFromTo[i].replaceFor,
          removeFromTo[i].original,
          removeFromTo[i].originalEnd
        );
      }
    }
    return originalString;
  }
}
