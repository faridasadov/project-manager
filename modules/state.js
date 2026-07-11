// Project Manager — central mutable app state.
//
// Classic <script> loaded FIRST (before other modules and script.js). Holds the
// app's mutable collections on one object so they are no longer scattered `let`
// globals. Because appState is a const object, its properties can be reassigned
// from anywhere in the shared global scope (appState.tasks = ...), which a
// read-only ES-module import could not do. Migrated incrementally, one field at
// a time — see script.js for the fields still declared as plain `let` globals.

/* eslint-disable no-unused-vars */

const appState = {};
