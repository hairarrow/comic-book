import React, { useState } from "react";

const pages_data = [
  {
    pageId: 0,
    rows: [
      {
        rowId: "0-0",
        panels: [
          {
            panelId: "0-0-0",
            description: "Ruby wakes up from his nap",
            messages: [
              {
                character: "Ruby",
                text: "Where did everyone go?"
              }
            ]
          },
          {
            panelId: "0-0-1",
            description: "Ruby jumps off the couch"
          }
        ]
      },
      {
        rowId: "0-1",
        panels: [
          {
            panelId: "0-1-0",
            description: "Ruby goes to the window",
            messages: [{ character: "Ruby", text: "I don't see their car!" }]
          }
        ]
      },
      {
        rowId: "0-2",
        panels: [
          {
            panelId: "0-2-0",
            description: "Ruby grabs his monkey"
          },
          {
            panelId: "0-2-1",
            description: "We see the monkey, in pain, in Ruby's mouth",
            messages: [{ character: "Monkey", text: "Ouch!" }]
          },
          {
            panelId: "0-2-2",
            description: "Ruby, surprised, drops the monkey."
          }
        ]
      }
    ]
  },
  {
    pageId: 1,
    rows: [
      {
        rowId: "1-0",
        panels: [
          {
            panelId: "1-0-0",
            description: "A dark, lonely, void"
          }
        ]
      }
    ]
  },
  {
    pageId: 2,
    rows: [
      {
        rowId: "2-0",
        panels: [
          {
            panelId: "2-0-0",
            description: "A slightly different, dark, lonely void"
          }
        ]
      }
    ]
  }
];

const getCharacterEmoji = (character) => {
  switch (character) {
    case "Ruby":
      return "🐶";
    case "Monkey":
      return "🙈";
    default:
      return;
  }
};

function getPageFromId(id, data = pages_data) {
  return data.filter(({ pageId }) => pageId === id)[0];
}

function frPerArrayItem(arr = []) {
  const { length } = arr;
  return Array.from({ length }, () => "1fr").join(" ");
}

function ComicBook() {
  const [currentPageId, setCurrentPageId] = useState(0);
  const pageData = getPageFromId(currentPageId);

  const isFirstPage = () => currentPageId === 0;
  const isLastPage = () => currentPageId === pages_data.length - 1;

  function prevPage() {
    if (isFirstPage()) {
      return;
    }

    setCurrentPageId(currentPageId - 1);
  }

  function nextPage() {
    if (isLastPage()) {
      return;
    }

    setCurrentPageId(currentPageId + 1);
  }

  const gridGap = 40;

  const buttonStyles = {
    height: 56,
    fontSize: "inherit",
    fontWeight: "bolder",
    padding: 16
  };

  return (
    <main
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        background: "#323334"
      }}
    >
      <article
        style={{
          maxWidth: 1200,
          width: "100%",
          minHeight: "100%",
          display: "grid",
          gridTemplateRows: "1fr auto"
        }}
      >
        <section
          style={{
            display: "grid",
            padding: gridGap,
            gridTemplateRows: `${frPerArrayItem(pageData.rows)}`,
            gridGap
          }}
        >
          {pageData.rows.map((row) => (
            <div
              key={row.Id}
              style={{
                display: "grid",
                gridTemplateColumns: `${frPerArrayItem(row.panels)}`,
                gridGap
              }}
            >
              {row.panels.map((panel) => (
                <div
                  key={panel.id}
                  style={{
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    flex: 1,
                    padding: gridGap,
                    lineHeight: 1.6,
                    borderRadius: 8
                  }}
                >
                  <p style={{ color: "rgba(0, 0, 0, .5)" }}>
                    {panel.description}
                  </p>
                  {panel.messages &&
                    panel.messages.map((message, messageId) => (
                      <div key={{ messageId }} style={{ fontSize: 24 }}>
                        {getCharacterEmoji(message.character)}: {message.text}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </section>
        <footer
          style={{
            paddingBottom: gridGap,
            paddingRight: gridGap,
            display: "grid",
            justifyContent: "flex-end",
            gridTemplateColumns: "auto auto",
            ...(!isFirstPage() && !isLastPage() && { gridGap })
          }}
        >
          {!isFirstPage() && (
            <button style={buttonStyles} onClick={prevPage}>
              Previous Page
            </button>
          )}
          {!isLastPage() && (
            <button style={buttonStyles} onClick={nextPage}>
              Next Page
            </button>
          )}
        </footer>
      </article>
    </main>
  );
}

export default ComicBook;
