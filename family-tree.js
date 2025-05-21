// FamilyTree class: handles storing and managing members
class FamilyTree {
    constructor() {
        this.members = new Map();
    }

    addMember(member) {
        if (!member.name) throw new Error('Name is required');

        this.members.set(member.id, {
            ...member,
            children: new Set(),
            parents: new Set()
        });
    }

    getAllMembers() {
        return Array.from(this.members.values());
    }
}

// TreeUI class: handles UI interaction
class TreeUI {
    constructor() {
        this.tree = new FamilyTree();
        this.form = document.getElementById('memberForm');
        this.treeContainer = document.getElementById('treeContainer');
        this.initEventListeners();
    }

    initEventListeners() {
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);

        try {
            const newMember = {
                id: crypto.randomUUID(),
                name: formData.get('fullName'),
                dob: formData.get('birthDate') || ''
            };

            this.tree.addMember(newMember);
            this.updateTreeVisualization();
        } catch (error) {
            this.showError(error.message);
        }

        this.form.reset();
    }

    updateTreeVisualization() {
        this.treeContainer.innerHTML = '';

        const members = this.tree.getAllMembers();

        members.forEach(member => {
            const div = document.createElement('div');
            div.className = 'tree-node';
            div.textContent = `${member.name}${member.dob ? ` (${member.dob})` : ''}`;
            this.treeContainer.appendChild(div);
        });
    }

    showError(message) {
        alert(`Error: ${message}`);
    }
}

// Initialize TreeUI after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TreeUI();
});
