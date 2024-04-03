
export async function fetchSomeAPI(link, method = "GET", body) {
    let options = { method: method, }
    if (method == 'POST' || method == 'PATCH') {
        options.body = JSON.stringify(body)
        options.headers = { 'Content-Type': 'application/json; charset=UTF-8', }
    }

    const response = await fetch(link, options)
    if (!response.ok) {
        throw { status: response.status, errors: JSON.parse(await response.text() || "{}")?.errors }
    }
    try {
        let data = await response.json()
        return data
    } catch (err) {

    }
}

export async function fetchProject(project_id, fetch_members = false, fetch_roles = false) {
    let project = await fetchSomeAPI(`/api/projects/${project_id}?fetch_members=${fetch_members}&fetch_roles=${fetch_roles}`)
    project.created_at = new Date(project.created_at)
    console.log("look project => ")
    console.log(project)
    return project
}

export async function fetchProjects(limit = 25) {
    let projects = await fetchSomeAPI(`/api/projects?limit=${limit}`)
    return projects
}

export async function fetchMembers(project_id, fetch_members = true) {
    return await fetchSomeAPI(`/api/projects/${project_id}/members?fetch_members=${fetch_members}`)
}

export async function fetchSections(project_id) {
    return await fetchSomeAPI(`/api/projects/${project_id}/sections`)
}

export async function fetchUser(user_id, fetch_projects = false) {
    return await fetchSomeAPI(`/api/users/${user_id}?fetch_projects=${fetch_projects}`)
}

export async function fetchUserInvites(fetch_users = true, fetch_projects = true) {
    return await fetchSomeAPI(`/api/invites?fetch_users=${fetch_users}&fetch_projects=${fetch_projects}`)
}
