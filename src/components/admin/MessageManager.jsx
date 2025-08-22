'use client';

export default function MessageManager({ initialMessages }) {
  const messages = initialMessages || [];

  return (
    <div>
      <table style={{ borderSpacing: "18px" }} className="messages-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Author</th>
            <th>Relation</th>
            <th>Content</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>
                {new Date(message.created_at).toLocaleDateString()}{" "}
                {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </td>
              <td>{message.author_name}</td>
              <td>{message.relation}</td>
              <td>{message.content}</td>
              <td>{message.status}</td>
              <td>
                {/* <Link href={`/admin/edit/${message.slug}`}>Edit</Link> */}
                {/* need another small component for delete */}
                {/* <DeleteButton messageId={message.id} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}