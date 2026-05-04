/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const speak = (text: string) => {
  if (!window.speechSynthesis) {
    console.error("Speech synthesis not supported in this browser.");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9; // Slightly slower for kids
  utterance.pitch = 1.1; // Friendly pitch

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  window.speechSynthesis.cancel();
};
