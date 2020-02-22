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
            panelId: "1-0-0k",
            description: "A dark, lonely, void"
          }
        ]
      }
    ]
  }
];

function ComicBook() {
  const DATA = [...pages_data];
  const [currentPage, setCurrentPage] = useState(0);

  function prevPage() {
    if (currentPage === 0) {
      return;
    }

    setCurrentPage(currentPage - 1);
  }

  function nextPage() {
    if (currentPage === pages_data.length - 1) {
      return;
    }

    setCurrentPage(currentPage + 1);
  }

  return (
    <article
      style={{ background: "#000", minWidth: "100vw", minHeight: "100vh" }}
    >
      <section>
        {DATA.filter((page) => page.pageId === currentPage)[0].rows.map(
          (row) => {
            return (
              <div
                key={row.Id}
                style={{
                  padding: 16,
                  display: "flex",
                  justifyContent: "stretch"
                }}
              >
                {DATA.filter((page) => page.pageId === currentPage)[0]
                  .rows.filter((filterRow) => filterRow.rowId === row.rowId)[0]
                  .panels.map((panel) => {
                    return (
                      <div
                        key={panel.id}
                        style={{
                          background: "#fff",
                          padding: 16,
                          margin: 8,
                          flex: 1
                        }}
                      >
                        <p style={{ color: "rgba(0, 0, 0, .5)" }}>
                          {panel.description}
                        </p>
                        {panel.messages &&
                          panel.messages.map((message, messageId) => (
                            <div key={{ messageId }}>
                              {message.character}: {message.text}
                            </div>
                          ))}
                      </div>
                    );
                  })}
              </div>
            );
          }
        )}
      </section>
      <footer style={{ padding: 24 }}>
        <button style={{ marginRight: 24 }} onClick={prevPage}>
          Previous Page
        </button>
        <button onClick={nextPage}>Next Page</button>
      </footer>
    </article>
  );
}

export default ComicBook;
