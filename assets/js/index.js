$("#add_user").submit(function (event) {
  alert("data added!");
});

$("#update_user").submit(function (event) {
  event.preventDefault();

  const unindexed_array = $(this).serializeArray();
  let data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });
  console.log(data);
  const request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function () {
    alert("data updated");
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    const id = $(this).attr("data-id");
    const request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };
    if (confirm("Are you sure, You want to delete the user ?")) {
      $.ajax(request).done(function () {
        alert("data deleted");
        location.reload();
      });
    }
  });
}
