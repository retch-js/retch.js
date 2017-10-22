/* globals document, window */

import $ from 'jquery';
import navigation from './navigation';

$(document).ready(() => {
  navigation($, window, window);
});
