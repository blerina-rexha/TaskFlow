# TaskFlow – Aufgabenverwaltung

## Projektbeschreibung

TaskFlow ist eine Aufgabenverwaltungs-Webanwendung, mit der Benutzer ihre täglichen Aufgaben organisieren, verwalten und priorisieren können.

Die Anwendung wurde mit React und JavaScript entwickelt. Das Design wurde mit CSS gestaltet.

## Funktionen

- **Aufgaben erstellen:** Neue Aufgaben mit Titel, Beschreibung, Kategorie und Deadline hinzufügen.
- **Aufgaben bearbeiten:** Bestehende Aufgaben ändern und speichern.
- **Aufgaben löschen:** Nicht mehr benötigte Aufgaben entfernen.
- **Aufgaben erledigen:** Aufgaben als erledigt markieren oder wieder öffnen.
- **Suchfunktion:** Aufgaben anhand ihres Titels suchen.
- **Kategorie-Filter:** Aufgaben nach Arbeit, Studium oder Privat filtern.
- **Automatische Sortierung:** Aufgaben nach Deadline sortieren. Offene Aufgaben werden zuerst angezeigt.
- **Dringlichkeit erkennen:** Überfällige und bald fällige Aufgaben erkennen und farblich kennzeichnen.
- **Fokusliste:** Besonders wichtige Aufgaben zu einer separaten Fokusliste hinzufügen und wieder entfernen.
- **Statistikübersicht:** Alle, offenen und erledigten Aufgaben anzeigen.
- **Automatische Speicherung:** Aufgaben werden im Browser gespeichert und bleiben nach dem Neuladen erhalten.

## Verwendete Technologien

- React
- JavaScript
- HTML
- CSS
- Vite
- localStorage

### Verwendete React-Hooks

- `useState` – Verwaltung lokaler Zustände.
- `useReducer` – Zentrale Verwaltung der Aufgaben und ihrer Aktionen.
- `useEffect` – Automatische Speicherung der Aufgaben in localStorage.

## Installation und Start

### Voraussetzungen

- Node.js
- npm

### 1. Projekt herunterladen

Das GitHub-Repository herunterladen oder klonen.

```bash
git clone https://github.com/DEIN-GITHUB-NAME/TaskFlow.git
```

### 2. Projektordner öffnen

```bash
cd TaskFlow
```

### 3. Abhängigkeiten installieren

```bash
npm install
```

### 4. Entwicklungsserver starten

```bash
npm run dev
```

### 5. Anwendung im Browser öffnen

Nach dem Start zeigt Vite eine lokale Adresse im Terminal an.

Normalerweise lautet diese:

http://localhost:5173

Die Adresse im Browser öffnen, um TaskFlow zu verwenden.

## Projekt erstellen und weiterentwickeln

Für einen Produktionsbuild kann folgender Befehl verwendet werden:

```bash
npm run build
```

## Speicherung der Aufgaben

Die Aufgaben werden mithilfe von `localStorage` direkt im Browser gespeichert.

Die Daten bleiben nach dem Neuladen der Anwendung erhalten. Die Speicherung ist lokal und nicht zwischen verschiedenen Benutzern oder Browsern synchronisiert.