import asset from './functions/asset.js';
import directory from './functions/directory.js';
import mime from './functions/mime.js';
import project from './functions/project.js';
import renderAnimation from './functions/renderAnimation.js';



import { AssetList, AssetFile, AssetFolder } from './components/asset/assetList.js';
import { AssetBrowser } from './components/asset/assetBrowser.js';
import { AssetDropUploader } from './components/asset/assetUploader.js';


import { ElementTimeline, ElementTimelineCursor, ElementTimelineRuler } from './components/element/elementTimeline.js';
import { ElementBar } from './components/element/elementBar.js';
import { ElementControl, ElementControlAsset, DragAlignmentGuide } from './components/element/elementControl.js';

import { KeyframeEditor } from './components/keyframe/keyframeEditor.js';
import { MenuDropdownBody, MenuDropdownItem } from './components/menu/menuDropdown.js';

import { AnimationPanel, AnimationPanelItem } from './components/animation/animationPanel.js';

import { OptionGroup } from './components/option/optionGroup.js';
import { OptionText } from './components/option/optionText.js';
import { OptionImage } from './components/option/optionImage.js';

import { InputText } from './components/input/inputText.js';



import "./sass/style.scss";


customElements.define('asset-list', AssetList);
customElements.define('asset-file', AssetFile);
customElements.define('asset-folder', AssetFolder);
customElements.define('asset-browser', AssetBrowser);
customElements.define('asset-upload-drop', AssetDropUploader);




customElements.define('element-timeline', ElementTimeline);
customElements.define('element-timeline-cursor', ElementTimelineCursor);
customElements.define('element-timeline-ruler', ElementTimelineRuler);

customElements.define('element-bar', ElementBar);
customElements.define('element-control', ElementControl);
customElements.define('element-control-asset', ElementControlAsset);
customElements.define('drag-alignment-guide', DragAlignmentGuide);



customElements.define('keyframe-editor', KeyframeEditor);

customElements.define('menu-dropdown-body', MenuDropdownBody);
customElements.define('menu-dropdown-item', MenuDropdownItem);

customElements.define('animation-panel', AnimationPanel);
customElements.define('animation-panel-item', AnimationPanelItem);

customElements.define('option-group', OptionGroup);
customElements.define('option-text', OptionText);
customElements.define('option-image', OptionImage);

customElements.define('input-text', InputText);






export { asset, directory, mime, project }
export { renderAnimation }